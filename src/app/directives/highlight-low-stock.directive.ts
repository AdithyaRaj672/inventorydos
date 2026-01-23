import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appHighlightLowStock]',
  standalone: true
})
export class HighlightLowStockDirective implements OnInit {
  @Input() quantity: number = 0;
  @Input() reorderLevel: number = 0;

  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    if (this.quantity <= this.reorderLevel) {
      this.elementRef.nativeElement.style.backgroundColor = '#fff3cd';
      this.elementRef.nativeElement.style.borderLeft = '4px solid #ff9800';
      this.elementRef.nativeElement.style.paddingLeft = '12px';
    }
  }
}
