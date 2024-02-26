import { time } from 'src/app/customTypes/times.type';

export interface ParametrizationForm {
  triggerName: string;
  speed: number;
  speedType: time;
  delay: number;
  delayType: time;
}
