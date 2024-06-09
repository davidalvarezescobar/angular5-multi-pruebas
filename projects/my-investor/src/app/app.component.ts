import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funds$ = this.appSrv.getFunds();
  
  constructor(
    readonly appSrv: AppService
  ) { }

  ngOnInit(): void {
  }
}
