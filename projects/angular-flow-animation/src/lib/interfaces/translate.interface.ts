import { Direction } from "../types/directions.enum";
import { size } from "../types/size.type";
import { AnimationConfig } from "./config.interface";

export type translateDirections = { [key in `${Lowercase<Direction>}Translate`]: size }

export interface TranslateAnimation extends AnimationConfig, translateDirections {
}
