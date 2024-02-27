import { AnimationConfig } from './../../projects/angular-flow-animation/src/lib/interfaces/config.interface';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpacityAnimation, angularAnimationFlowOpacity } from 'projects/angular-flow-animation/src/public-api';
import { ParametrizationComponent } from './components/parametrization/parametrization.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IParametrizationForm, IParametrizationInput } from '@interfaces/parametrization.interface';
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
    angularAnimationFlowOpacity({ triggerName: 'initAnimation', speed: '700ms' }),
    angularAnimationFlowOpacity({ speed: '700ms' }),
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
    parametrization: new FormControl<IParametrizationForm & { initialOpacity: number, endOpacity: number }>(
      {
        triggerName: 'tiggerName',
        speed: 500,
        speedType: 'ms',
        delay: 0,
        delayType: 'ms',
        initialOpacity: 0,
        endOpacity: 1
      })
  });
  animation = computed(() => {
    this.write();
    return exampleCode(
      `trigger('${this.params.triggerName}', [
        transition(':enter, * => true, * => false', [
          style({ opacity: ${this.params.initialOpacity} }),
          animate('${this.params.speed} ${this.params.delay}', style({ opacity: ${this.params.endOpacity} }),)
        ]),
    ])`, this.params.triggerName
    )
  });

  structure: IParametrizationInput<any>[] = [
    {
      validators: [Validators.required],
      key: 'initialOpacity',
      label: 'Opacidad inicial',
      type: 'number',
      value: 0
    },
    {
      validators: [Validators.required],
      key: 'endOpacity',
      label: 'Opacidad final',
      type: 'number',
      value: 0
    }
  ]
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
  get params(): OpacityAnimation {
    const { triggerName, speed, speedType, delay, delayType, endOpacity, initialOpacity } = this.formGroup.controls.parametrization.value!
    return {
      speed: `${speed}${speedType}`,
      delay: `${delay}${delayType}`,
      initialOpacity,
      endOpacity,
      triggerName
    }
  }
  update() {
    this.write.set(!this.write());
  }

  getElement() {

  }
}
