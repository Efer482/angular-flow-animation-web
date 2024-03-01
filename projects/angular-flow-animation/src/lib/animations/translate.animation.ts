import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";
import { getConfig } from "../configAnimation";
import { TranslateAnimation } from "../interfaces/translate.interface";
import { Direction } from "../types/directions.enum";

export const angularAnimationFlowTranslate = (
  animationConfig?: Partial<TranslateAnimation>
) => {
  const animationDefault: Partial<TranslateAnimation> = {
    triggerName: 'ngxFTranslate',
    rightTranslate: '-15rem',
    leftTranslate: '15rem',
    downTranslate: '15rem',
    upTranslate: '-15rem',
  };
  const params = getConfig<TranslateAnimation>(animationConfig ?? {}, animationDefault);

  function generateDirectionAnimation(direction: Direction, reverse: boolean) {
    const translateDirections: Record<Direction, `${'translate'}${'X' | 'Y'}`> = {
      'RIGHT': 'translateX',
      'LEFT': 'translateX',
      'DOWN': 'translateY',
      'UP': 'translateY',
    }
    const directionLowercase = `${(direction.toLowerCase() as Lowercase<Direction>)}Translate` as keyof Required<TranslateAnimation>;
    const initialTranslate = reverse ? '0' : params[directionLowercase];
    const endTranslate = reverse ? params[directionLowercase] : '0';
    const directionTranslate = translateDirections[direction];
    const position = reverse ? '{{enterPosition}}' : '{{leavePosition}}';
    return query(`[ngx-direction="${direction}"]`, [
      style({ transform: `${directionTranslate}(${initialTranslate})`, position, ...params.enterCustomParams }),
      animate(`{{speed}} {{delay}}`, style({ transform: `${directionTranslate}(${endTranslate})`, position, ...params.leaveCustomParams })),
      animateChild({ duration: '{{duration}}', params })
    ], { optional: true })
  }

  return trigger(params.triggerName, [
    transition(':enter, * => true', [
      group([
        style({ position: 'relative' }),
        generateDirectionAnimation(Direction.Right, false),
        generateDirectionAnimation(Direction.Left, false),
        generateDirectionAnimation(Direction.Down, false),
        generateDirectionAnimation(Direction.Up, false)
      ])
    ], { params: params }),
    transition(':leave, * => false', [
      group([
        style({ position: 'relative' }),
        generateDirectionAnimation(Direction.Right, true),
        generateDirectionAnimation(Direction.Left, true),
        generateDirectionAnimation(Direction.Down, true),
        generateDirectionAnimation(Direction.Up, true)
      ])
    ], { params }),
  ]);
}
