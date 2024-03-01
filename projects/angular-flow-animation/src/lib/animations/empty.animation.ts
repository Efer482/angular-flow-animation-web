import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";
import { getConfig } from "../configAnimation";
import { AnimationConfig } from "../interfaces/config.interface";

export const angularAnimationFlowEmptys = (
  animationConfig?: Partial<AnimationConfig>
) => {
  const params = getConfig<AnimationConfig>({
    ...animationConfig
  }, { triggerName: 'ngxFEmpty' });
  return trigger(params.triggerName, [
    transition('* <=> *', [
      query('@ngxFOpacity', group([
        animateChild({ duration: '{{duration}}', params: params }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
      ]), { optional: true }),
    ], { params: params }),
  ]);
}
