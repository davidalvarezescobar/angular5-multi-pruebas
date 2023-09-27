import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventoModel } from '../../evento-model';
import { Location } from '@angular/common';
import { MyValidators } from '../../my-validators';


@Component({
  selector: 'app-eventos-alta',
  templateUrl: './eventos-alta.component.html',
  styleUrls: ['./eventos-alta.component.css']
})
export class EventosAltaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: HttpService,
    public location: Location
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      canBePublished: 'N',
      eventCharge: [0, Validators.required ],
      eventClass: ['', Validators.required ],
      eventCode: ['', [Validators.required, MyValidators.eventCode] ],
      eventComplexity: ['', Validators.required ],
      eventDescription: ['', Validators.required ],
      eventLargeDescription: ['', [Validators.required, Validators.minLength(4)] ],
      eventPriority: ['', Validators.required ],
      eventType: ['', Validators.required ],
      mandatoryEventInd: 'N',
      motor: ['', Validators.required ]
    });
    console.log(this.form);
  }

  onSubmit() {
    console.log(this.form);

    // let {
    //   motor:{dataCode:motorCode},
    //   motor:{dataDescription:motorDescription},
    //   ...resto
    // } = this.form.value;
    // // console.log(Object.assign({motorCode, motorDescription}, ...resto));
    // // console.log({motorCode, motorDescription, ...resto});
    // motorDescription = motorDescription.trim();
    // const datosAlta = {motorCode, motorDescription, ...resto, newEvent:true, planCode:'', planDescription:''};
    // console.log(datosAlta);
    // this.appService.nuevoEvento(datosAlta).subscribe(x => console.log('x',x));
  }

}
