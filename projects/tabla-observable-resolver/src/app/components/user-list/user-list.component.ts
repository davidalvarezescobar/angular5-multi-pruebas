import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[];
  @Output() onUpdateUser = new EventEmitter();
  @Output() onAddUser = new EventEmitter();
  @Output() onAproveAll = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
