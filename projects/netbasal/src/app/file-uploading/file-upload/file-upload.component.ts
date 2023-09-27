import { Component, OnInit, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  template: `
    <div>
      <span>Choose file</span>
      <span>{{file ? file.name : 'or drag and drop file here' }}</span>
      <br>
      <input type='file'>
    </div>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
]
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  file: File | null = null;
  private _registerOnChange;
  private _registerOnTouched;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0); // de una posible lista de ficheros, sólo recogeríamos el primero
    this.file = file;
    this._registerOnChange(file);
  }

  constructor(
    private host: ElementRef
    ) { }

  ngOnInit() {
    console.log('input type["file"]', this.host.nativeElement.querySelector('input'));
  }

  // formControl IN
  writeValue(obj: any): void {
    // control.patchValue(null) or control.reset() clear the file input
    this.host.nativeElement.querySelector('input').value = '';
  }
  // formControl OUT
  registerOnChange(fn: any): void {
    this._registerOnChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._registerOnTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
