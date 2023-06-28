import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[imgHover]'
})
export class ImgHoverDirective {

  
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.el.nativeElement.style.height = '50px';
    this.el.nativeElement.style.width = '200px';
    this.el.nativeElement.style.position = 'relative';
    this.el.nativeElement.style.bottom = '5px';
    this.el.nativeElement.style.fontSize = '18px';
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.el.nativeElement.style.height = 'auto';
    this.el.nativeElement.style.width = 'auto';
    this.el.nativeElement.style.bottom = '0px';
    this.el.nativeElement.style.fontSize = '15px';
  }
}
