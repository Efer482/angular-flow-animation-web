import { animate, style, transition, trigger } from "@angular/animations";
import { OpacityAnimation } from "../../interfaces/enter/opacity.interface";
import { getConfig } from "../../configAnimation";

export const angularAnimationFlowEnterOpacity = (
  animationConfig?: Partial<OpacityAnimation>
) => {
  const { triggerName, delay, speed } = getConfig<OpacityAnimation>(animationConfig, { triggerName: 'ngxFOpacity' });
  return trigger(triggerName, [
    transition(':enter, * => true, * => false', [
      style({ opacity: 0 }),
      animate(`{{speed}} {{delay}}`, style({ opacity: 1 }),)
    ], { params: { delay, speed } }),
    // ...objectStatesGenerator([':enter', 'false'], style({ opacity: 0 })),
    // ...objectStatesGenerator(['true', ':leave'], style({ opacity: 1 })),
  ]);
}
