import { time } from 'src/app/customTypes/times.type';
import { TranslateValueInterface } from './translate.interface';
import { Validators } from '@angular/forms';

export interface IParametrizationForm {
  triggerName: string;
  speed: number;
  speedType: time;
  delay: number;
  delayType: time;
}

export interface IParametrizationInput<T> {
  type: 'timer' | 'string' | 'number' | 'selected';
  label: TranslateValueInterface['key'] | string;
  key: string;
  value: T;
  validators: Validators[];
}
