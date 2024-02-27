import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef, inject } from '@angular/core';
import { CardComponent } from '../../Templates/card/card.component';
import { TranslatePipe } from '@pipes/translate.pipe';
import { ButtonComponent } from '@templates/button/button.component';
import { Subscription, debounceTime } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IParametrizationForm, IParametrizationInput } from '@interfaces/parametrization.interface';
import { TextInputComponent } from '@templates/text-input/text-input.component';
import { SelectInputComponent } from '@templates/select-input/select-input.component';
import { Options } from '@interfaces/select.interface';
import { time } from 'src/app/customTypes/times.type';

export type AbstractControlMapped<T> = {
  [K in keyof T]: T[K] extends infer U ? (U | ((control: AbstractControl<any, any>) => ValidationErrors | ValidationErrors | null)[])[] : never;
};

@Component({
  selector: 'app-parametrization',
  standalone: true,
  imports: [CardComponent, TextInputComponent, ReactiveFormsModule, ButtonComponent, CommonModule, TranslatePipe, SelectInputComponent],
  templateUrl: './parametrization.component.html',
  styleUrl: './parametrization.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParametrizationComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParametrizationComponent),
      multi: true
    }
  ]
})
export class ParametrizationComponent implements ControlValueAccessor, Validator, OnDestroy, OnInit {
  @Output() animate: EventEmitter<boolean> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  @Input() structure: IParametrizationInput<unknown>[] = [];
  formBuilder = inject(FormBuilder);

  basicParametrizacion: Record<string, [unknown, Validators[]]> = {
    triggerName: ['triggerName', [Validators.required]],
    speed: [500, [Validators.required, Validators.min(0)]],
    speedType: ['ms', [Validators.required]],
    delay: [0, [Validators.required, Validators.min(0)]],
    delayType: ['ms', [Validators.required]],
  }
  fullParametrization: Record<string, [unknown, Validators[]]> = {}
  parametrizationForm!: FormGroup;
  #suscription!: Subscription;

  public timesOptions: (Options & { value: time })[] = [
    { value: 'ms', label: 'milliseconds' },
    { value: 's', label: 'seconds' },
  ]

  ngOnInit(): void {
    this.structure.forEach((input) => {
      this.fullParametrization[input.key] = [input.value, input.validators]
    })
    this.fullParametrization = { ...this.basicParametrizacion, ...this.fullParametrization };

    this.parametrizationForm = this.formBuilder.group(this.fullParametrization);

    this.#suscription = this.parametrizationForm.valueChanges.pipe(debounceTime(100)).subscribe(() => {
      if (!this.parametrizationForm.valid) return
      this.#onTouch(this.parametrizationForm.value);
      this.#onChanged(this.parametrizationForm.value);
    });
  }

  #onChanged: Function = (_: string | number) => { };
  #onTouch: Function = (_: string | number) => { };

  registerOnChange(fn: Function): void {
    this.#onChanged = fn;
  }
  registerOnTouched(fn: Function): void {
    this.#onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {

  }
  writeValue(value: IParametrizationForm): void {

    if (value) this.parametrizationForm.setValue(value);
  }
  validate(_: AbstractControl): ValidationErrors | null {
    return this.parametrizationForm.valid ? null : { invalidTriggerName: true }
  }
  ngOnDestroy(): void {
    this.#suscription?.unsubscribe()
  }
}
