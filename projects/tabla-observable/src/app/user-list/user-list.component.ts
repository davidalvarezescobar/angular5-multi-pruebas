import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[];
  @Output() updateUser = new EventEmitter();
  @Output() addUser = new EventEmitter();
  @Output() aproveAll = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
