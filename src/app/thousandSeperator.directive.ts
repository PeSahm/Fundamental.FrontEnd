import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appThousandSeparator]',
  standalone:true,
})
export class ThousandSeparatorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    // Get the input value
    let value = event.target.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Add thousand separators
    const formattedValue = this.formatNumberWithCommas(value);

    // Update the input value with separators
    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  private formatNumberWithCommas(value: string): string {    
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}