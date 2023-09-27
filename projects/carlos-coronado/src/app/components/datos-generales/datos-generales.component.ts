import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  toggle = true;
  datosCombos$;
  subForm: FormGroup;

  constructor(
    readonly appService: HttpService,
    readonly controlContainer: ControlContainer
  ) { }

  ngOnInit() {
    this.subForm = this.controlContainer.control as FormGroup;
    this.datosCombos$ = this.appService.getCombosEvento();
  }

}
