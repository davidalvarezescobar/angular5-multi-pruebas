import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-table',
  template: `
    <app-user-list [users]="users"></app-user-list>
  `,
  styleUrls: []
})
export class TableComponent implements OnInit {
  users;

  constructor(
    readonly route: ActivatedRoute,
    readonly appSrv: AppService
  ) { }

  ngOnInit() {
    console.log('Table data con snapshot: ', this.route.snapshot.data['users']);
    this.users = this.route.snapshot.data['users'];
    // también podría haber recogido los datos mediante el servicio:
    this.appSrv.users$.subscribe(users => console.log('Table data con observable: ', users));
  }

}
