import { animate, animateChild, style, transition, trigger } from "@angular/animations";
import { OpacityAnimation } from "../interfaces/opacity.interface";
import { getConfig } from "../configAnimation";

export const angularAnimationFlowOpacity = (
  animationConfig?: Partial<OpacityAnimation>
) => {
  const params = getConfig<OpacityAnimation>(
    { enterOpacity: 0, leaveOpacity: 1, ...animationConfig },
    { triggerName: 'ngxFOpacity' });

  return trigger(params.triggerName, [
    transition(':enter, * => true', [
      style({ opacity: '{{enterOpacity}}' }),
      animate(`{{speed}} {{delay}}`, style({ opacity: '{{leaveOpacity}}' }),),
      animateChild({ duration: '{{duration}}', params })
    ], { params }),
    transition(':leave, * => false', [
      style({ opacity: '{{leaveOpacity}}' }),
      animate(`{{speed}} {{delay}}`, style({ opacity: '{{enterOpacity}}' }),),
      animateChild({ duration: '{{duration}}', params })
    ], { params }),
  ]);
}
