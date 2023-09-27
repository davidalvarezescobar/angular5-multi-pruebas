import { Component, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  private stream = new Subject();

  @Output() searchData: Observable<any> = this.stream.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => console.log(1, _))
    );


  constructor() { }

  ngOnInit() {
  }

  buscar(txt) {
    this.stream.next(txt);
  }

}
