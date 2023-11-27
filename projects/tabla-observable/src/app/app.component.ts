import { Component, OnInit } from '@angular/core';
import { AppService, IUser } from './app.service';
import { Observable } from 'rxjs';
import { StoreUserService } from './store/store-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  users$: Observable<IUser[]>;
  showModal = false;

  constructor(
    private service: AppService,
    readonly userStore: StoreUserService
  ) {}

  ngOnInit() {
    // this.users$ = this.service.getUsers(); // servicio DEPRECADO
    this.users$ = this.userStore.getState();
    this.userStore.getState().subscribe();
    this.userStore.getState().subscribe();
  }

  onUpdateUser(user) {
    this.userStore.updatePremium(user);
  }

  onAddUser(user) {
    this.userStore.addUser(user);
  }

  onAproveAll() {
    this.userStore.aproveAll();
  }
}
