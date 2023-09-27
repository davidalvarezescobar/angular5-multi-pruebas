import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  toggle = true;
  datosCombos$;
  @Input() parent: FormGroup;

  constructor(private appService: HttpService) { }

  ngOnInit() {
    this.datosCombos$ = this.appService.getCombosEvento();
  }

}
