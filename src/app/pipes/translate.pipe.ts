import { Injectable, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { TranslateInterface, TranslateValueInterface } from '@interfaces/translate.interface';
import { TranslateService } from '@services/translate.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  destroy$ = new Subject();
  currentLanguage: string = '';
  constructor(private translateService: TranslateService) {
  }

  transform(value: TranslateInterface['key'], params?: Array<TranslateValueInterface> | TranslateValueInterface): string {
    // Obtenemos la traduccion
    let translate = this.translateService.getTranslate(value);

    // Sino le damos parametros de traducciones, devolvemos la traduccion directamente
    if (!params) {
      return translate;
    }
    if (!Array.isArray(params)) {
      params = [params];
    }

    // intercambiamos el valor de {key} por el que lo vamos a intercambiar
    for (const param of params) {
      translate = translate.replaceAll(`{${param.key}}`, `${param.value}`);
    }
    // devolvemos la traduccion

    return translate;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
