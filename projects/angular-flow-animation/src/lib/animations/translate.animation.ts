import { animate, group, query, style, transition, trigger } from "@angular/animations";
import { OpacityAnimation } from "../interfaces/enter/opacity.interface";
import { getConfig } from "../configAnimation";

export const angularAnimationFlowTranslate = (
  animationConfig?: Partial<OpacityAnimation>
) => {
  const { triggerName, delay, speed } = getConfig<OpacityAnimation>(animationConfig, { triggerName: 'ngxFOpacity' });
  return trigger(triggerName, [
    transition(':enter, * => true, * => false', [
      group([
        query('[ngx-direction="RIGHT"]', [
          style({ opacity: 0, transform: 'translateX(-15rem)' }),
          animate(`{{speed}} {{delay}}`, style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true }),
        query('[ngx-direction="LEFT"]', [
          style({ opacity: 0, transform: 'translateX(15rem)' }),
          animate(`{{speed}} {{delay}}`, style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true }),
        query('[ngx-direction="DOWN"]', [
          style({ opacity: 0, transform: 'translateY(15rem)' }),
          animate(`{{speed}} {{delay}}`, style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query('[ngx-direction="UP"]', [
          style({ opacity: 0, transform: 'translateY(-15rem)' }),
          animate(`{{speed}} {{delay}}`, style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
      ])
    ], { params: { delay, speed } }),
  ]);
}
