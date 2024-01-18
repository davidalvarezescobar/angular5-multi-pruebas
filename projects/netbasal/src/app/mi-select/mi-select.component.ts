import { Component, ElementRef, Input } from '@angular/core';

export interface ObjetoConLabel {
  [key: string]: any;  // Puede tener cualquier propiedad
  label: string;       // Debe tener la propiedad 'label' de tipo 'string'
};


@Component({
  selector: 'app-mi-select',
  templateUrl: './mi-select.component.html',
  styleUrls: ['./mi-select.component.scss']
})
export class MiSelectComponent {
  @Input() options: ObjetoConLabel[];
  @Input() selectedOption: ObjetoConLabel;

  open = false;

  constructor(
    readonly elementRef: ElementRef
  ) { }

  openPanel() {
    this.open = true;
  }

  closePanel(): void {
    this.open = false;
  }

  onDocumentClick({ target }: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closePanel();
    }
  }

  onSelect(option: ObjetoConLabel) {
    this.selectedOption = option;
    this.closePanel();
  }
}
