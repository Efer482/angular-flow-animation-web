import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslateInterface } from '@interfaces/translate.interface';
import { TranslatePipe } from '@pipes/translate.pipe';
import { TranslateService } from '@services/translate.service';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({ required: true }) id: string = 'button__componnet';
  @Input({ required: false }) message: TranslateInterface['key'] = 'submit';
  @Input({ required: false }) value?: TranslateInterface;

  @Output() clickEvent: EventEmitter<Event> = new EventEmitter();
  constructor(private translateService: TranslateService) {

  }

  async changeLanguage(language: string) {
    this.translateService.changeLanguage(language)
  }
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.clickEvent.emit(event)
  }
}
