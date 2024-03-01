import { States } from "./states.enum";

export type CssStateGenerator<T, css extends Capitalize<string>> = { [key in `${Lowercase<States>}${css}`]: T }
export type PositionState = Partial<CssStateGenerator<'absolute' | 'relative' | '*', 'Position' >>;
export type OpacityState = Partial<CssStateGenerator<number | '*', 'Opacity'>>;

export type CSSStates = PositionState & OpacityState;
