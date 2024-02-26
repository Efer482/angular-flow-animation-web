export function exampleCode(animation: string) {
  const component = `

import { animate, style, transition, trigger } from "@angular/animations";
import {Component} from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: '<div style="height: 100px; width: 100px; background-color: brown" [@tiggerName]>Element</div>',
  styleUrls: ['./app.component.scss'],
  animations: [
      ${animation}
  ]})
export class AppComponent  {

    }
`
  return component
}
