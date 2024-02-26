import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',

})
export class GalleryComponent {
  @Input({ required: false }) colums: number = 3;
  styleColums = `grid-template-columns: repeat(${this.colums}, minmax(0, 1fr))`;
}
