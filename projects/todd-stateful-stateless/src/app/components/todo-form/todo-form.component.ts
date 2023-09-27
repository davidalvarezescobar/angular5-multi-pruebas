import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less']
})
export class TodoFormComponent implements OnInit {
  @Output() add = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      tarea: ['', Validators.required]
    });
  }

  onSubmit() {
    this.form['submitted'] = true;
    if (this.form.valid) {
      this.add.emit(this.form.value);
      this.form['submitted'] = false;
      this.form.reset();
    }

    // Sin FormGroup:
    // this.add.emit({tarea: this.tarea});
  }

}
