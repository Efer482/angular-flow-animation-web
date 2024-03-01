import { AfterViewInit, Component, ElementRef, Renderer2, TemplateRef, ViewChild, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpacityAnimation, angularAnimationFlowOpacity } from 'projects/angular-flow-animation/src/public-api';
import { ParametrizationComponent } from './components/parametrization/parametrization.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IParametrizationForm, IParametrizationInput } from '@interfaces/parametrization.interface';
import { CardComponent } from '@templates/card/card.component';
import { GalleryComponent } from '@components/examples/gallery/gallery.component';
import { exampleCode } from './utilities/exampleCode.utility';
import { ButtonComponent } from '@templates/button/button.component';
import { angularAnimationFlowTranslate } from 'projects/angular-flow-animation/src/lib/animations/translate.animation';
import { CssHostBindingDirective } from './directives/styles-host-binding.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParametrizationComponent, FormsModule, CardComponent, GalleryComponent, ButtonComponent, ReactiveFormsModule, CssHostBindingDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    angularAnimationFlowOpacity({ triggerName: 'initAnimation', speed: '700ms' }),
    angularAnimationFlowOpacity({ speed: '700ms' }),
    angularAnimationFlowTranslate({ triggerName: 'menuAnimation', speed: '1s', rightTranslate: '-45rem', enterPosition: 'absolute', leavePosition: 'relative' }),
  ]
})
export class AppComponent implements AfterViewInit {
  renderer = inject(Renderer2);
  @ViewChild('animationExample', { static: false }) animationExample!: ElementRef;
  @ViewChild(ParametrizationComponent, { static: false }) parametrization!: ParametrizationComponent;
  toggleAnimation = signal(false);
  toggleMenu = signal(false);
  show = signal(true);
  cancel = signal(false);
  write = signal(false);
  public animationSelected = "ngxFOpacity";
  title = 'angular-flow-animation-web';

  formGroup = new FormGroup({
    parametrization: new FormControl<IParametrizationForm & { enterOpacity: number, leaveOpacity: number }>(
      {
        triggerName: 'tiggerName',
        speed: 500,
        speedType: 'ms',
        delay: 0,
        delayType: 'ms',
        enterOpacity: 0,
        leaveOpacity: 1
      }, [Validators.required])
  });

  animationCode = computed(() => {
    this.write();
    return exampleCode(
      `trigger('${this.params.triggerName}', [
        transition(':enter, * => true, * => false', [
          style({ opacity: ${this.params.enterOpacity} }),
          animate('${this.params.speed} ${this.params.delay}', style({ opacity: ${this.params.leaveOpacity} }),)
        ]),
    ])`, this.params.triggerName
    )
  });

  structure: IParametrizationInput<any>[] = [
    {
      validators: [Validators.required],
      key: 'enterOpacity',
      label: 'Opacidad inicial',
      type: 'number',
      value: 0
    },
    {
      validators: [Validators.required],
      key: 'leaveOpacity',
      label: 'Opacidad final',
      type: 'number',
      value: 0
    }
  ]
  ngAfterViewInit(): void {
    this.setVoidAnimation();
  }
  animate() {
    const myElementNative = this.animationExample.nativeElement;
    const params = this.params;
    if (this.formGroup.invalid) {
      this.parametrization.animateError();
      return
    };

    this.renderer.setProperty(myElementNative, '@ngxFOpacity', { value: this.toggleAnimation(), params: { speed: '0ms' } });
    this.toggleAnimation.set(!this.toggleAnimation());
    this.renderer.setProperty(myElementNative, '@ngxFOpacity', { value: this.toggleAnimation(), params });

  }
  toggleShow() {
    this.show.set(!this.show());
    if (this.show()) {
      this.setVoidAnimation();
    }
  }
  setVoidAnimation() {
    setTimeout(() => {
      const myElementNative = this.animationExample.nativeElement;
      this.renderer.setProperty(myElementNative, '@ngxFOpacity', { value: undefined, params: this.params });
    }, 0);
  }
  cancelAnimation() {
    this.cancel.set(true);
    setTimeout(() => {
      this.cancel.set(false);
    }, 10);
  }
  get params(): OpacityAnimation {
    const { triggerName, speed, speedType, delay, delayType, leaveOpacity, enterOpacity } = this.formGroup.get('parametrization')!.value!
    return {
      speed: `${speed}${speedType}`,
      delay: `${delay}${delayType}`,
      duration: `500ms`,
      enterOpacity,
      leaveOpacity,
      triggerName,
      enterCustomParams: {},
      leaveCustomParams: {},
    }
  }
  update() {
    this.write.set(!this.write());
    this.setVoidAnimation();
  }

  getElement() {

  }
}
