import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-file-uploading',
  templateUrl: './file-uploading.component.html',
  styleUrls: ['./file-uploading.component.css']
})
export class FileUploadingComponent implements OnInit {
  signup: FormGroup;
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.signup = this.fb.group({
      email: [null, Validators.required],
      image: [null, Validators.required]
    });
  }

  submit() {
    console.log('form:', this.signup.value);

    const fd = this.toFormData(this.signup.value);
    this.http.post('https://reqres.in/api/user', fd, {reportProgress: true, observe: 'events'})
      .subscribe(res => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * res.loaded) / res.total);
          console.log(this.progress);
        }

        if (res.type === HttpEventType.Response ) {
          console.log(res.body);
          this.signup.reset();
  }
      });
  }

  private toFormData<T>( formValue: T ) {
    // creo que se usa el formData para poder enviar un fichero
    const formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }

    console.log('FILE: ', formData.get('image'));

    return formData;
  }

}
