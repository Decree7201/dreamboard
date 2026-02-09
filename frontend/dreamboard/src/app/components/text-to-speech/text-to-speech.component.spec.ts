import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TextToSpeechComponent } from './text-to-speech.component';

describe('TextToSpeechComponent', () => {
  let component: TextToSpeechComponent;
  let fixture: ComponentFixture<TextToSpeechComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextToSpeechComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextToSpeechComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial default values', () => {
    expect(component.text).toBe('');
    expect(component.selectedVoice).toBe('en-US-Standard-A');
  });

  it('should have the "Generate" button disabled initially', () => {
    const generateButton = nativeElement.querySelector(
      'button[mat-flat-button]'
    ) as HTMLButtonElement;
    expect(generateButton.disabled).toBeTrue();
  });

  it('should enable the "Generate" button when text is provided', async () => {
    const generateButton = nativeElement.querySelector(
      'button[mat-flat-button]'
    ) as HTMLButtonElement;

    expect(generateButton.disabled).toBeTrue();

    component.text = 'This is a test.';
    fixture.detectChanges();
    await fixture.whenStable(); // for ngModel

    expect(generateButton.disabled).toBeFalse();
  });

  it('should call generateSpeech when the "Generate" button is clicked', async () => {
    spyOn(component, 'generateSpeech');
    const generateButton = nativeElement.querySelector(
      'button[mat-flat-button]'
    ) as HTMLButtonElement;

    component.text = 'This is a test.';
    fixture.detectChanges();
    await fixture.whenStable();

    generateButton.click();

    expect(component.generateSpeech).toHaveBeenCalled();
  });

  it('should update the text property on textarea input', async () => {
    const textarea = nativeElement.querySelector('textarea')!;
    textarea.value = 'New text';
    textarea.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(component.text).toBe('New text');
  });
});