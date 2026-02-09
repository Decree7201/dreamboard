import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../utils';


@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css',
})
export class TextToSpeechComponent implements AfterViewInit {
  text = '';
  selectedVoice = 'en-US-Standard-A';
  voices = [
    { value: 'en-US-Standard-A', viewValue: 'English (US) - Standard A' },
    { value: 'en-US-Standard-B', viewValue: 'English (US) - Standard B' },
    { value: 'en-US-Standard-C', viewValue: 'English (US) - Standard C' },
    { value: 'en-US-Standard-D', viewValue: 'English (US) - Standard D' },
    { value: 'en-US-Standard-E', viewValue: 'English (US) - Standard E' },
  ];
  private _snackBar = inject(MatSnackBar);

  ngAfterViewInit() {}

  generateSpeech() {

    openSnackBar(this._snackBar, 'Generating speech... Please wait.');

    console.log('Generating speech for:', this.text);
  }
}