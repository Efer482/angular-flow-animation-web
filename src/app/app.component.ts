import { AnimationConfig } from './../../projects/angular-flow-animation/src/lib/interfaces/config.interface';
import { Component, ElementRef, Renderer2, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { angularAnimationFlowEnterOpacity } from 'projects/angular-flow-animation/src/public-api';
import { ParametrizationComponent } from './components/parametrization/parametrization.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ParametrizationForm } from '@interfaces/parametrization.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParametrizationComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    angularAnimationFlowEnterOpacity({ triggerName: 'parametrizationAnimate', speed: '700ms' }),
    angularAnimationFlowEnterOpacity({ speed: '700ms' }),
  ]
})
export class AppComponent {
  renderer = inject(Renderer2);
  @ViewChild('animationExample', { static: false }) animationExample!: ElementRef;
  toggle = signal(false);
  cancel = signal(false);
  write = signal(false);
  public animationSelected = "ngxFOpacity";
  title = 'angular-flow-animation-web';
  formGroup = new FormGroup({
    parametrization: new FormControl<ParametrizationForm>({ triggerName: 'tiggerName', speed: 500, speedType: 'ms' })
  });
  animation = computed(() => {
    this.toggle();
    this.cancel();
    this.write();
    return `trigger(triggerName, [
    transition(':enter, * => true, * => false', [
      style({ opacity: 0 }),
      animate('${this.params.speed} ${this.params.delay}', style({ opacity: 1 }),)
    ]}),
    // ...objectStatesGenerator([':enter', 'false'], style({ opacity: 0 })),
    // ...objectStatesGenerator(['true', ':leave'], style({ opacity: 1 })),
  ]`
  });
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
  get params(): Omit<AnimationConfig, 'triggerName'> {
    const { triggerName, speed, speedType } = this.formGroup.controls.parametrization.value!
    return {
      speed: `${speed}${speedType}`,
      delay: '0ms'
    }
  }
  update() {
    this.write.set(!this.write());
  }
}
