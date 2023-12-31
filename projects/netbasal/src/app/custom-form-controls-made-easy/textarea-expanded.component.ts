import { Component, OnInit, ViewChild, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const EPANDED_TEXTAREA_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaExpandedComponent),
  multi: true,
};


@Component({
  selector: 'app-textarea-expanded',
  providers: [EPANDED_TEXTAREA_VALUE_ACCESSOR],
  template: `
    <label style="vertical-align: top">div editable:</label>
    <div contenteditable="true"
      #textarea
      tabindex="1"
      role="textarea"
      (input)="onInput($event)">
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TextareaExpandedComponent implements OnInit, ControlValueAccessor {
  @ViewChild('textarea', { static: true }) textarea;
  private _onChange: (value) => {};
  private _registerOnTouched: any;

  constructor() { }

  ngOnInit() { }


  writeValue(obj: any): void {
    // este método se encarga de realizar el seteo de los datos
    // que se recibirían mediante @Input() en un componente normal
    this.textarea.nativeElement.textContent = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._registerOnTouched = fn;
  }

  onInput($event) {
    // 3 Formas diferentes de obtener la información
    console.log($event.target.textContent);
    console.log($event.target.innerText);
    console.log($event.target.innerHTML);
    // propagamos hacia el modelo la información
    this._onChange($event.target.textContent);
  }


  // Angular will call this method in one of the following cases:
  // 1  When you instantiate a new FormControl with the disabled property set to true ==> FormControl({value: '', disabled: true})
  // 2  When you call control.disable() or when you call control.enable() after your already called control.disable() at least once.
  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    const action = isDisabled ? 'add' : 'remove';
    this.textarea.nativeElement.classList[action]('disabled');
    this.textarea.nativeElement.setAttribute('contenteditable', !isDisabled);
  }

}
