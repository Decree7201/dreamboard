#
from fastapi import APIRouter, HTTPException
from models.audio import audio_request_models, audio_gen_models
from services.audio.audio_api_service import AudioAPIService
import utils
import logging

audio_gen_router = APIRouter()
audio_api_service = AudioAPIService()

@audio_gen_router.get("/list_voices/{language_code}")
def list_voices(language_code: str):
    """Returns a list of available voices for the given language."""
    try:
        return audio_api_service.list_available_voices(language_code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@audio_gen_router.post("/generate_audio/{story_id}", response_model=audio_gen_models.AudioGenerationResponse)
def generate_audio(story_id: str, audio_segment: audio_request_models.AudioSegmentGenerationOperation):
    try:
        # Define the output directory in GCS
        output_gcs_uri = utils.get_audio_bucket_base_path(story_id)
        
        # Call the service to generate and upload audio
        return audio_api_service.generate_audio(story_id, output_gcs_uri, audio_segment)
    except Exception as e:
        logging.error(f"DreamBoard - AUDIO_ROUTES: Error generating audio: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))