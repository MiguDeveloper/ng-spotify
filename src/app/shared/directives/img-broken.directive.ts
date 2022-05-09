import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
})
export class ImgBrokenDirective {
  @Input() customImg: string = '';

  @HostListener('error') handleError(): void {
    const elementNativo = this.elHost.nativeElement;
    const imgPlaceHolder = 'https://via.placeholder.com/150';

    elementNativo.src = this.customImg
      ? (elementNativo.src = this.customImg)
      : imgPlaceHolder;
  }

  constructor(private elHost: ElementRef) {}
}
