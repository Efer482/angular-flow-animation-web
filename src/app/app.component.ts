import { AnimationConfig } from './../../projects/angular-flow-animation/src/lib/interfaces/config.interface';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { angularAnimationFlowEnterOpacity } from 'projects/angular-flow-animation/src/public-api';
import { ParametrizationComponent } from './components/parametrization/parametrization.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParametrizationForm } from '@interfaces/parametrization.interface';
import { CardComponent } from '@templates/card/card.component';
import { GalleryComponent } from '@components/examples/gallery/gallery.component';
import { exampleCode } from './utilities/exampleCode.utility';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParametrizationComponent, ReactiveFormsModule, CardComponent, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    angularAnimationFlowEnterOpacity({ triggerName: 'initAnimation', speed: '700ms' }),
    angularAnimationFlowEnterOpacity({ speed: '700ms' }),
  ]
})
export class AppComponent implements AfterViewInit {
  renderer = inject(Renderer2);
  @ViewChild('animationExample', { static: false }) animationExample!: ElementRef;
  toggle = signal(false);
  cancel = signal(false);
  write = signal(false);
  public animationSelected = "ngxFOpacity";
  title = 'angular-flow-animation-web';
  formGroup = new FormGroup({
    parametrization: new FormControl<ParametrizationForm>(
      {
        triggerName: 'tiggerName',
        speed: 500,
        speedType: 'ms',
        delay: 0,
        delayType: 'ms'
      })
  });
  animation = computed(() => {
    this.toggle();
    this.cancel();
    this.write();
    return exampleCode(
    `trigger('tiggerName', [
        transition(':enter, * => true, * => false', [
          style({ opacity: 0 }),
          animate('500ms 0ms', style({ opacity: 1 }),)
        ]),
    ])`
)
  });
  ngAfterViewInit(): void {
    this.animate()
  }
  animate() {
    const myElementNative = this.animationExample.nativeElement;
    this.renderer.setProperty(myElementNative, '@ngxFOpacity', { value: this.toggle(), params: { speed: '0ms' } });
    this.toggle.set(!this.toggle());
    this.renderer.setProperty(myElementNative, '@ngxFOpacity', { value: this.toggle(), params: this.params });
  }
  cancelAnimation() {
    this.cancel.set(true);
    setTimeout(() => {
      this.cancel.set(false);
    }, 0);
  }
  get params(): AnimationConfig {
    const { triggerName, speed, speedType, delay, delayType } = this.formGroup.controls.parametrization.value!
    return {
      speed: `${speed}${speedType}`,
      delay: `${delay}${delayType}`,
      triggerName
    }
  }
  update() {
    this.write.set(!this.write());
  }

  getElement() {

  }
}
