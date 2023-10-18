import { Component, OnInit } from '@angular/core';
import { mergeWith, Subject } from 'rxjs';
import { merge } from 'rxjs';
import { concat } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StoreEventosService } from '../../providers/store.eventos.service';


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos$: Observable<any>;
  searchStream = new Subject();                      // con subject, no realiza una primera búsqueda al cargarse la página
  // searchStream = new BehaviorSubject(undefined);  // con behaviorsubject, sí
  columna;
  ordenAsc;

  constructor(
    private eventosService: StoreEventosService
  ) { }

  ngOnInit() {
    this.initStream();
    
    // esta línea es sólo por comprobar que el 'shareReplay' del 'store', funciona
    this.eventosService.getState().subscribe();
  }

  initStream() {
    const initialStream$ = this.eventosService.getState().pipe(
      tap(x => console.log('todas los datos vienen por este stream: ', x))
    );
    const searchStream$ = this.searchStream.pipe(
      switchMap((term: string) => this.eventosService.loadEventos(term)),
      tap(x => console.log('por este stream no deberían venir datos: ', x))
    );
    this.eventos$ = merge(initialStream$, searchStream$);
  }

  sort(columna) {
    this.ordenAsc = !this.ordenAsc;
    this.columna = columna;
  }

  searchData(term: any) {
    this.searchStream.next(term);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
