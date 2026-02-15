# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
A class for managing communication with the Audio API.

This class provides methods for sending requests to and receiving responses
from the Audio API (TTS).
"""

import logging
import time
import uuid
import utils
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import ResourceExhausted
from google.cloud import texttospeech_v1beta1 as texttospeech
from models.audio import audio_request_models
from models.audio import audio_gen_models
from services.storage_service import storage_service


class AudioAPIService:
  """Class that handles interactions with the Audio API."""

  def __init__(self):
    """Initializes the AudioAPIService."""
    # Initialize the Text-to-Speech client.
    self.tts_client = texttospeech.TextToSpeechClient(
      client_options=ClientOptions(api_endpoint="texttospeech.googleapis.com")
    )

  def list_available_voices(self, language_code: str = None):
    """Lists the available voices from the Text-to-Speech API."""
    # Performs the list voices request
    response = self.tts_client.list_voices(request={"language_code": language_code})

    voices = []
    for voice in response.voices:
        # Each voice has a name, language codes, and ssml_gender
        voices.append({
            "name": voice.name,
            "ssml_gender": voice.ssml_gender.name,
            "language_codes": list(voice.language_codes)
        })
    return voices

  def generate_audio(
      self,
      story_id: str,
      output_gcs_uri: str,
      audio_segment: audio_request_models.AudioSegmentGenerationOperation
  ) -> audio_gen_models.AudioGenerationResponse:
    """
    Generates audio using the selected model.

    Args:
        story_id (str): The ID of the story.
        output_gcs_uri (str): The GCS URI where the output audio will be stored.
        audio_segment (audio_request_models.AudioSegmentGenerationOperation): The
            AudioSegmentGenerationOperation containing audio generation parameters.

    Returns:
        audio_gen_models.AudioGenerationResponse: A AudioGenerationResponse object
        indicating the status of the audio generation.
    """
    logging.info(
        "DreamBoard - AUDIO_GENERATOR: Starting audio generation for "
        "story id %s and audio segment %s...",
        story_id,
        audio_segment.id,
    )

    retries = 3
    for this_retry in range(retries):
      try:
        synthesis_input = texttospeech.SynthesisInput(text=audio_segment.prompt)

        voice = texttospeech.VoiceSelectionParams(
            language_code=audio_segment.language_code,
            name=audio_segment.voice_name
        )

        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = self.tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )

        audio_uris = []
        if response.audio_content:
            file_name = f"{uuid.uuid4()}.mp3"
            final_output_gcs_uri = f"{output_gcs_uri}/{file_name}"
            blob = storage_service.upload_from_bytes(
                final_output_gcs_uri, response.audio_content, "audio/mpeg"
            )
            gcs_uri = f"gs://{blob.bucket.name}/{blob.name}"
            audio_uris.append(utils.get_signed_uri_from_gcs_uri(gcs_uri))

        return audio_gen_models.AudioGenerationResponse(
            done=True,
            execution_message="Audio generated successfully!",
            audio_uris=audio_uris,
            audio_segment=audio_segment,
        )

      except ResourceExhausted as ex:
        error_message = str(ex)
        logging.error(
            "QUOTA RETRY for generate_audio: %s. ERROR %s ...",
            (this_retry + 1),
            error_message,
        )
        wait_time = 10 * 2**this_retry
        time.sleep(wait_time)
      except Exception as ex:
        logging.error("ERROR: %s\n", str(ex))
        return audio_gen_models.AudioGenerationResponse(
            done=False,
            execution_message=f"Error generating audio: {str(ex)}",
            audio_uris=[],
            audio_segment=audio_segment,
        )