import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent {
  @Input() users: IUser[];
  @Output() onUpdateUser = new EventEmitter();
  @Output() onAddUser = new EventEmitter();
  @Output() onAproveAll = new EventEmitter();

}
