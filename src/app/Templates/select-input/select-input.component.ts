import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Select } from '@interfaces/select.interface';
import { TranslateInterface } from '@interfaces/translate.interface';
import { TranslatePipe } from '@pipes/translate.pipe';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input({ required: true }) id: string = 'text_input__componnet';
  @Input({ required: true }) options: Select['options'] = [];
  @Input({ required: false }) label: TranslateInterface['key'] = 'inputSelect';
  @Input({ required: false }) translateOptions: Select['translateOptions'] = false;
  value!: string | number;
  #onChanged: Function = (_: string | number) => { };
  onTouch: Function = (_: string | number) => { };

  setValue(value: string | number) {
    this.#onChanged(this.value = value);
    this.onTouch(this.value);
  }
  //#region ControlValueAccesor
  writeValue(value: string | number): void {
    if (value) this.value = value;
  }
  registerOnChange(fn: Function): void {
    this.#onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }
  //#endregion
}
