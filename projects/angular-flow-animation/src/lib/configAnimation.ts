import { AnimationConfig } from "./interfaces/config.interface";

export function getConfig<T extends AnimationConfig>(functionConfig: Partial<T> = {}, originalConfig: Partial<T> = {}): T {
  const defaultConfig: AnimationConfig = {
    delay: "0ms",
    speed: "300ms",
    triggerName: 'ngxFAnimation'
  }

  return { ...(defaultConfig as any), ...originalConfig, ...functionConfig }

}
