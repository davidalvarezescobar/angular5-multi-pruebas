import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  planes$: Observable<any>;

  constructor(private appService: HttpService) { }

  ngOnInit() {
    this.planes$ = this.appService.getListadoPlanes();
  }

}
