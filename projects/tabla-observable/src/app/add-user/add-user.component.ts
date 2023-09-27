import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() aceptar = new EventEmitter();
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required ],
      registration: '',
      email: '',
      isPremium: false
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.aceptar.emit(this.form.value);
    this.form.setValue({name:'', registration:'', email:'', isPremium:false})
  }

}
