import { AnimationConfig } from "./interfaces/config.interface";
import { States } from "./types/states.enum";
export type ParseConfig<T> = {
  [K in keyof T]: K extends `active${Capitalize<States>}${string}` ? string : T[K];
};
export type ExtractConfig<T> = {
  [K in keyof T as K extends `${Lowercase<States>}${infer Rest}` ? `${Lowercase<Rest>}` : K]: T[K];
};
export function getConfig<T extends AnimationConfig>(functionConfig: Partial<T>, originalConfig: Partial<T>, enter?: undefined): Required<T>
export function getConfig<T extends AnimationConfig>(functionConfig: Partial<T>, originalConfig: Partial<T>, enter: boolean): Required<ExtractConfig<T>>
export function getConfig<T extends AnimationConfig>(functionConfig: Partial<T>, originalConfig: Partial<T>, enter: boolean | undefined): any {

  const defaultConfig: AnimationConfig = {
    delay: "0ms",
    speed: "300ms",
    duration: "1500ms",
    triggerName: 'ngxFAnimation',
    enterCustomParams: {},
    leaveCustomParams: {},
  }
  const animation: AnimationConfig = { ...defaultConfig, ...originalConfig, ...functionConfig };
  const animationParse: Required<Omit<AnimationConfig, 'customParams'>> = {
    ...animation,
    delay: animation.delay,
    speed: animation.speed,
    duration: animation.duration,
    triggerName: animation.triggerName,
    enterPosition: animation.enterPosition || '*',
    leavePosition: animation.leavePosition || '*',
    enterOpacity: animation.enterOpacity || '*',
    leaveOpacity: animation.leaveOpacity || '*',
    ...animation.enterCustomParams,
    ...animation.leaveCustomParams,
  }
  if (typeof enter === 'boolean') {
    return animationStatesExtract(animationParse, enter)
  }
  return (animationParse as Required<T>)
}

export function animationStatesExtract<T extends Required<Omit<AnimationConfig, 'customParams'>>>(animationParams: Required<Omit<AnimationConfig, 'customParams'>>, enter: boolean): ExtractConfig<T> {
  const animationExtract: Required<ExtractConfig<Omit<AnimationConfig, 'customParams'>>> = {
    ...animationParams,
    opacity: (enter ? animationParams.enterOpacity : animationParams.leaveOpacity),
    position: (enter ? animationParams.enterPosition : animationParams.leavePosition),
    customparams: (enter ? animationParams.enterCustomParams : animationParams.leaveCustomParams),
  }
  return (animationExtract as ExtractConfig<T>)
}
