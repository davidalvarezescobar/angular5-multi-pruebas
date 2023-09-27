import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-template-outlet',
  templateUrl: './template-outlet.component.html',
  styleUrls: ['./template-outlet.component.css']
})
export class TemplateOutletComponent implements OnInit {
  arr = ['uno', 'dos'];

  form: FormGroup;

  users = [
    { name: 'John', id: 1 },
    { name: 'Andrew', id: 2 },
    { name: 'Anna', id: 3 },
    { name: 'Iris', id: 4 }
  ];
  selectedUserId = new FormControl('');
  blackListedUsers = new FormControl([]);
  allowBlackListedUsers = new FormControl(false);
  isDisabled$ = combineLatest([
    this.allowBlackListedUsers.valueChanges.pipe(startWith(false)),
    this.blackListedUsers.valueChanges.pipe(startWith([])),
    this.selectedUserId.valueChanges.pipe(startWith(null), map(id => +id))
  ]).pipe(
    map(([allowBlackListed, blackList, selected]) => {
      return !allowBlackListed && blackList.includes(selected);
    })
  )

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      input1: 'hola',
      input2: 'adios'
    });
  }

  onSelect(e) {
    alert(e);
  }
}
