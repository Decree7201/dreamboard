import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AudioSegmentGenerationOperation, AudioGenerationResponse } from '../models/audio.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  // Derive the base URL from an existing environment variable (e.g., textGenerationApiURL)
  private apiUrl = environment.audioGenerationApiURL;
  PROXY_URL = environment.proxyURL;

  constructor(private http: HttpClient) {}

  generateAudio(storyId: string, audioSegment: AudioSegmentGenerationOperation): Observable<AudioGenerationResponse> {
    const requestBody = {
      url: `${this.apiUrl}/generate_audio/${storyId}`,
      options: {
        method: 'POST',
        data: audioSegment,
      },
    };
    return this.http.post<AudioGenerationResponse>(
      `${this.PROXY_URL}/api/handleRequest`,
      requestBody
    );
  }

  listVoices(languageCode: string): Observable<any[]> {
  const requestBody = {
    url: `${this.apiUrl}/list_voices/${languageCode}`,
    options: {
      method: 'GET',
    },
  };
  return this.http.post<any[]>(
    `${this.PROXY_URL}/api/handleRequest`,
    requestBody
    );
  }
}

