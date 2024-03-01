import {  Directive, DoCheck, ElementRef, Input, inject } from '@angular/core';

@Directive({
  selector: '[appCssHostBinding]',
  standalone: true,
})
export class CssHostBindingDirective implements DoCheck {
  renderer: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLElement>);
  targetQuery: string = '#CSSTarget';

  addSkin() {
    const target = this.renderer.nativeElement.querySelector<HTMLElement>(this.targetQuery);
    if (target) {
      target.setAttribute('class', `${this.targetClass}`);
      target.setAttribute('style', `${this.targetStyle}`);
    }
  }

  ngDoCheck() {
    this.addSkin();
  }

  get targetClass(): string {
    return this.renderer.nativeElement.getAttribute('class') ?? '';
  }
  get targetStyle(): string {
    return this.renderer.nativeElement.getAttribute('style') ?? '';
  }
}
