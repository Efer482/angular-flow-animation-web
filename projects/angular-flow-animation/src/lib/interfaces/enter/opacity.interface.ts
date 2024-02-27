import { AnimationConfig } from "../config.interface";

export interface OpacityAnimation extends AnimationConfig {
  initialOpacity: number;
  endOpacity: number;
}
