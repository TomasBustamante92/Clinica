import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[inhabilitarBoton]'
})
export class InhabilitarBotonDirective implements OnChanges {

  @Input() public inhabilitarBoton: any;

  constructor(private el: ElementRef) {}

  @HostListener('change') ngOnChanges() {
    if(this.inhabilitarBoton){
      this.el.nativeElement.style.opacity = 1;
      this.el.nativeElement.disabled = false;
    }
    else{
      this.el.nativeElement.style.opacity = .5;
      this.el.nativeElement.disabled = true;
    }
  }

}
