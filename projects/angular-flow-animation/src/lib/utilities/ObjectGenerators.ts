import { AnimationStateMetadata, AnimationStyleMetadata, state } from "@angular/animations";


export function objectStatesGenerator(states: string[], style: AnimationStyleMetadata): AnimationStateMetadata[] {
  const objects = states.map(stat => state(stat, style));
  return objects;
}
