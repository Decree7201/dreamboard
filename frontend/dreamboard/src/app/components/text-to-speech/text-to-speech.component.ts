import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AudioService } from '../../services/audio.service';
import { AUDIO_MODELS, AudioSegmentGenerationOperation } from '../../models/audio.model';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss']
})
export class TextToSpeechComponent implements OnInit {
  models = AUDIO_MODELS;
  
  // Form fields
  selectedModel: string = this.models[0].value;
  text: string = '';
  styleInstruction: string = '';
  selectedLanguage: string = 'en-US';
  selectedVoice: string = '';

  // State
  isLoading = false;
  generatedAudioUri: string | null = null;
  errorMessage: string | null = null;

  // Options
  languages = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'es-ES', label: 'Spanish (Spain)' },
    { value: 'fr-FR', label: 'French (France)' },
    { value: 'ar-XA', label: 'Arabic' },
  ];

  availableVoices: any[] = [];


  // Voice mappings
  chirpVoices = [
    { value: 'en-US-Chirp-HD-D', label: 'Chirp HD D (Male)' },
    { value: 'en-US-Chirp-HD-F', label: 'Chirp HD F (Female)' },
    { value: 'en-US-Chirp-HD-O', label: 'Chirp HD O (Female)' },
    { value: 'en-GB-Chirp-HD-A', label: 'Chirp HD A (UK)' },
  ];

  geminiVoices = [
    { value: 'Puck', label: 'Puck' },
    { value: 'Charon', label: 'Charon' },
    { value: 'Kore', label: 'Kore' },
    { value: 'Fenrir', label: 'Fenrir' },
    { value: 'Aoede', label: 'Aoede' },
  ];

  get currentVoices() {
    return this.availableVoices;
  }

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.fetchVoices();
  }

  onLanguageChange() {
    this.fetchVoices();
  }

  onModelChange() {
    this.fetchVoices();
  }

  fetchVoices() {
    this.isLoading = true;
    this.audioService.listVoices(this.selectedLanguage).subscribe({
      next: (voices) => {
        this.availableVoices = voices.map(v => ({
          value: v.name,
          label: `${v.name} (${v.ssml_gender})`
        }));

        // Automatically select the first voice if current selection is invalid
        if (this.availableVoices.length > 0) {
          const exists = this.availableVoices.find(v => v.value === this.selectedVoice);
          if (!exists) {
            this.selectedVoice = this.availableVoices[0].value;
          }
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Failed to load available voices from the API.";
      }
    });
  }

  updateVoiceSelection() {
    const voices = this.currentVoices;
    if (!voices.find(v => v.value === this.selectedVoice)) {
      this.selectedVoice = voices[0].value;
    }
  }

  generateAudio() {
    if (!this.text) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.generatedAudioUri = null;

    const operation: AudioSegmentGenerationOperation = {
      id: crypto.randomUUID(),
      audio_model: this.selectedModel,
      text: this.text,
      style_instruction: this.styleInstruction,
      language_code: this.selectedLanguage,
      voice_name: this.selectedVoice
    };

    // Using a dummy story ID for now as it's required by the API
    const storyId = 'tts-playground'; 

    this.audioService.generateAudio(storyId, operation).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.done && response.audio_uris && response.audio_uris.length > 0) {
          this.generatedAudioUri = response.audio_uris[0];
        } else {
          this.errorMessage = response.execution_message || 'Generation failed.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'An error occurred.';
      }
    });
  }
}