export interface AudioSegmentGenerationOperation {
  id: string;
  audio_model: string;
  text: string;
  style_instruction?: string;
  language_code: string;
  voice_name: string;
}

export interface AudioGenerationResponse {
  done: boolean;
  execution_message: string;
  audio_uris: string[];
  audio_segment?: AudioSegmentGenerationOperation;
}

export const AUDIO_MODELS = [
  { value: 'chirp-3-0', label: 'Chirp 3' },
  { value: 'gemini-2.5-flash-001', label: 'Gemini 2.5 Flash TTS' },
  { value: 'gemini-2.5-pro-001', label: 'Gemini 2.5 Pro TTS' },
  { value: 'gemini-2.5-flash-lite-preview-001', label: 'Gemini 2.5 Flash Lite Preview TTS' }
];