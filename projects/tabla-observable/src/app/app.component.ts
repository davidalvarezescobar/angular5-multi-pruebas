import { Component, OnInit } from '@angular/core';
import { AppService, IUser } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users$: Observable<IUser[]>;
  showModal = false;

  constructor(
    private service: AppService
  ) {}

  ngOnInit() {
    this.users$ = this.service.getUsers();
    this.service.getUsers();
    this.service.getUsers();
  }

  onUpdateUser(user) {
    this.service.updatePremium(user);
  }

  onAddUser(user) {
    this.service.addUser(user);
  }

  onAproveAll() {
    this.service.aproveAll();
  }
}
