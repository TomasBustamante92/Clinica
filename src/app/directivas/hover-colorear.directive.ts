import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hoverColorear]'
})
export class HoverColorearDirective {

  constructor(private el: ElementRef) {}

  @HostListener("mouseenter") onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'rgb(0, 179, 255)';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.borderRadius = '100%';
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
