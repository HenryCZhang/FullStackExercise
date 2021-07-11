import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImportantText]'
})
export class ImportantTextDirective {

  constructor(private el:ElementRef) {
    el.nativeElement.style.background = "yellow";
   }

}
