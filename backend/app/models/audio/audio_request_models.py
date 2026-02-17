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
Request models for Audio API.
"""

from typing import Any, Dict, Optional
from pydantic import BaseModel


class AudioSegmentGenerationOperation(BaseModel):
  """Model for audio segment generation operation."""

  id: str
  audio_model: str
  text: str
  style_instruction: Optional[str] = None
  language_code: str = "en-US"
  voice_name: str

  @property
  def prompt(self) -> str:
    """Returns the prompt for the audio generation."""
    # if self.style_instruction:
    #   return f"{self.style_instruction}. {self.text}"
    return self.text
