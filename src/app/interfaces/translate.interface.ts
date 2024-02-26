import { EN } from "@data/en";
import { ES } from "@data/es";

export interface TranslateValueInterface {
  key: string,
  value: string | number
}
export interface TranslateInterface {
  key: keyof typeof EN & keyof typeof ES,
  value: string
}
