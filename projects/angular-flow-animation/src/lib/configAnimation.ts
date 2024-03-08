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

  const animationPartail: Partial<AnimationConfig> = {};

  Object.keys(animation).forEach((key) => {
    animationPartail[key as keyof AnimationConfig] = animation[key as keyof AnimationConfig] ?? '*' as any;
  });

  if (typeof enter === 'boolean') {
    return animationStatesExtract(animationPartail as Required<AnimationConfig>, enter)
  }
  return (animationPartail as T)
}

export function animationStatesExtract<T extends Required<AnimationConfig>>(animationParams: Required<AnimationConfig>, enter: boolean): ExtractConfig<T> {
  const animationExtractPartial: Partial<ExtractConfig<AnimationConfig>> = {}
  Object.keys(animationParams).forEach(key => {
    const propKey = key.replace("enter", '').replace("leave", "") as keyof ExtractConfig<AnimationConfig>;
    const enterKey = `enter${propKey}` as keyof Required<AnimationConfig>;
    const leaveKey = `leave${propKey}` as keyof Required<AnimationConfig>;
    const valueKey = enter ? enterKey : leaveKey;
    (animationExtractPartial as any)[propKey] = animationParams[valueKey];
  });
  return (animationExtractPartial as ExtractConfig<T>)
}
