import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ViewEncapsulation, forwardRef, inject, input, signal } from '@angular/core';
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
import { angularAnimationFlowOpacity } from 'projects/angular-flow-animation/src/public-api';
import { CssHostBindingDirective } from 'src/app/directives/styles-host-binding.directive';

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
  ],
  animations: [
    angularAnimationFlowOpacity(),
  ],
  hostDirectives: [CssHostBindingDirective]
})
export class ParametrizationComponent implements ControlValueAccessor, Validator, OnDestroy, OnInit {
  @Input() structure: IParametrizationInput<unknown>[] = [];
  formBuilder = inject(FormBuilder);
  animationError = signal(false);
  basicParametrizacion: Record<string, [unknown, Validators[]]> = {
    triggerName: [null, [Validators.required]],
    speed: [null, [Validators.required, Validators.min(0)]],
    speedType: [null, [Validators.required]],
    delay: [null, [Validators.required, Validators.min(0)]],
    delayType: [null, [Validators.required]],
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
      this.#onTouch(this.parametrizationForm.value);
      this.#onChanged(this.parametrizationForm.value);
    });
  }
  animateError() {
    this.animationError.set(!this.animationError())
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
    return this.parametrizationForm.valid ? null : { invalidParametrization: true }
  }
  ngOnDestroy(): void {
    this.#suscription?.unsubscribe()
  }
}
