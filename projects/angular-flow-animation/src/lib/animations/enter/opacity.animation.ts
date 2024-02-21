import { animate, style, transition, trigger, state } from "@angular/animations";
import { OpacityAnimation } from "../../interfaces/enter/opacity.interface";
import { getConfig } from "../../configAnimation";

export const angularAnimationFlowEnterOpacity = (
  animationConfig?: Partial<OpacityAnimation>
) => {
  const { triggerName, delay, speed } = getConfig<OpacityAnimation>(animationConfig, { triggerName: 'ngxFOpacity' });
  return trigger(triggerName, [
    transition('void => *', animate(`${speed} ${delay}`)),
    state('void', style({ opacity: 0 })),
    state('*', style({ opacity: 1 })),
  ]);
}
