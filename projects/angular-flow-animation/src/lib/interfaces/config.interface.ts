import { time } from "../types/time.type";

export interface AnimationConfig {
  delay: `${number}${time}`;
  speed: `${number}${time}`;
  triggerName: string;
}
