import { Component, OnInit, HostListener, ElementRef, forwardRef, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { provideValueAccessor } from '../../_helpers/helpers';


@Component({
  selector: 'app-file-upload',
  template: `
    <div>
      <span>Choose file</span>&nbsp;<span>{{ file ? file.name : 'or drag and drop file here' }}</span>
      <br>
      <input type='file'>
    </div>
  `,
  styles: [
    `:host {
      background: aliceblue;
      display: inline-block;
    }`
  ],
  providers: [
    // provideValueAccessor(FileUploadComponent)

    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => FileUploadComponent),
    //   multi: true
    // }
]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  file: File | null = null;
  private _registerOnChange;
  private _registerOnTouched;

  control!: AbstractControl | null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event?.item(0); // de una posible lista de ficheros, sólo recogeríamos el primero
    this.file = file;
    this._registerOnChange(file);
  }

  constructor(
    private host: ElementRef,
    @Self() ngControl: NgControl
    ) {
      ngControl.valueAccessor = this;
      setTimeout(() => {
        this.control = ngControl.control; // get a reference to our control
      });
    }

  ngOnInit() {
    console.log('input type["file"]', this.host.nativeElement.querySelector('input'));
  }

  // formControl IN
  writeValue(value: any): void {
    this.host.nativeElement.querySelector('input').value = '';
    this.file = null;
  }
  // formControl OUT
  registerOnChange(fn: any): void {
    this._registerOnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._registerOnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}
