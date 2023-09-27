import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../../providers/preloader.service';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.css']
})
export class AccionesComponent implements OnInit {

  constructor(private preloaderSrv: PreloaderService) { }

  ngOnInit() {
    this.preloaderSrv.hideLoader();
  }

}
