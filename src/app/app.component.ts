import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { angularAnimationFlowEnterOpacity } from 'projects/angular-flow-animation/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [angularAnimationFlowEnterOpacity({ delay: "1202ms" })]
})
export class AppComponent {
  title = 'angular-flow-animation-web';
}
