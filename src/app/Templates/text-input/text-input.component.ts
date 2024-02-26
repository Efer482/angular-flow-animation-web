import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TranslateInterface } from '@interfaces/translate.interface';
import { TranslatePipe } from '@pipes/translate.pipe';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input({ required: false }) type: 'text' | 'password' | 'number' = 'text';
  @Input({ required: true }) id: string = 'text_input__componnet';
  @Input({ required: false }) label: TranslateInterface['key'] = 'inputlabel';

  @Input({ required: false }) min?: number;

  value!: string | number;
  #onChanged: Function = (_: string | number) => { };
  onTouch: Function = (_: string | number) => { };

  setValue(value: string | number) {
    this.#onChanged(this.value = value);
    this.onTouch(this.value);
  }
  //#region ControlValueAccesor
  writeValue(value: string | number): void {
    if (value !== undefined) this.value = value;
  }
  registerOnChange(fn: Function): void {
    this.#onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }
  //#endregion
}
