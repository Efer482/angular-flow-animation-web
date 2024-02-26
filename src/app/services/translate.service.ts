import { Injectable } from '@angular/core';
import { EN } from '@data/en';
import { ES } from '@data/es';
import { TranslateInterface } from '@interfaces/translate.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  // Objeto donde guardaremos las traducciones
  private languageSubject = new BehaviorSubject<string>(navigator.language);
  public language$ = this.languageSubject.asObservable();
  public currentLanguage = navigator.language;
  constructor() {
    this.getData();
    this.language$.subscribe(leanguague => {
      if (this.currentLanguage != leanguague) {
        this.currentLanguage = leanguague;
        this.getData(leanguague);
      }
    })
  }

  /**
   * Obtenemos todos los datos de las traducciones de un idioma
   * @param path
   * @param language
   * @returns
   */
  getData(language?: string) {
    // Si no le pasamos el lenguaje, cojemos el del navegador.
    if (!language) {
      language = navigator.language;
    }
    switch (language) {
      case 'es':
        this.data = ES
        break;
      case 'en':
        this.data = EN
        break;
      default:
        this.data = ES
        break;
    }
    // return new Promise((resolve, _) => {
    //   // Si no le pasamos el lenguaje, cojemos el del navegador.
    //   if (!language) {
    //     language = navigator.language;
    //   }

    //   // Obtenemos las traducciones del idioma elegido
    //   this.http.get(path + language + ".json").subscribe({
    //     next: (data) => {
    //       this.data = data;
    //       resolve(true);
    //     }, error: (_) => {
    //       // Sino existe el idioma, cogemos el de por defecto
    //       this.http.get(path + "es.json").subscribe({
    //         next: (data) => {
    //           this.data = data;
    //           resolve(true);
    //         }, error: (_) => {
    //           resolve(false);
    //         }
    //       })
    //     }
    //   })
    // })
  }
  changeLanguage = (language: string) => this.languageSubject.next(language);
  /**
   * Obtenemos una traduccion concreta
   * @param key
   * @returns
   */
  getTranslate(key: TranslateInterface['key']): string {
    return this.data ? this.data[key] ?? key : key;
  }
  set data(data: any) {
    window.localStorage.setItem('leanguage', JSON.stringify(data));
  }
  get data() {
    return JSON.parse(window.localStorage.getItem('leanguage') ?? '{}');
  }
}
