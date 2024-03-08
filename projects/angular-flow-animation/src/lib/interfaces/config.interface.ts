import { CssStateGenerator } from './../types/cssStates.type';
import { CSSStates } from "../types/cssStates.type";
import { timer } from "../types/time.type";

export type CustomParamsStates = CssStateGenerator<{ [key: string]: string }, 'CustomParams'>;
export interface AnimationConfig extends Partial<CSSStates>, Partial<CustomParamsStates> {
  delay: timer;
  speed: timer;
  duration: timer;
  triggerName: string;
}
