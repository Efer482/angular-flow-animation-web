import { animate, style, transition, trigger } from "@angular/animations";
import { OpacityAnimation } from "../interfaces/enter/opacity.interface";
import { getConfig } from "../configAnimation";

export const angularAnimationFlowOpacity = (
  animationConfig?: Partial<OpacityAnimation>
) => {
  const { triggerName, delay, speed, initialOpacity, endOpacity } = getConfig<OpacityAnimation>({
    initialOpacity: 0,
    endOpacity: 1,
    ...animationConfig
  }, { triggerName: 'ngxFOpacity' });
  return trigger(triggerName, [
    transition(':enter, * => true, * => false', [
      style({ opacity: '{{initialOpacity}}' }),
      animate(`{{speed}} {{delay}}`, style({ opacity: '{{endOpacity}}' }),)
    ], { params: { delay, speed, initialOpacity, endOpacity } }),
  ]);
}
