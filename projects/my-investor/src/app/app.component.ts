import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showChart = false;
  showNetReturn$ = new BehaviorSubject<boolean>(false);

  // funds$ = this.appSrv.getFunds().pipe(
  //   switchMap((funds: any[]) => forkJoin(this.getCurrentRentabilidad(funds))),
  //   tap((funds: any[]) => console.log('Fondos con rentabilidad:', funds)),
  // );

  funds$ = this.showNetReturn$.pipe(
    switchMap(loadMore => this.appSrv.getFunds().pipe(
      switchMap((funds: any[]) => {
        if (!loadMore) return [funds]; // con [items] se crea un observable de un array con un único elemento, equivalente a of(funds)
        return forkJoin(this.getCurrentRentabilidad(funds))
      }),
      tap((funds: any[]) => console.log('Fondos con rentabilidad:', funds)),
    ))
  );

  selectedOrder = 'ytd';

  imgSrcPart1 = 'https://www.morningstar.es/es/funds/WebGraph/growth10k4year.aspx?id=';
  imgSrcPart2 = '&currencyId=EUR&investmenttype=FO&MsRestructureDate=&IMARestructureDate=&RestructureDate=&ShowCategory=1&ShowIndex=1';

  constructor(
    readonly appSrv: AppService
  ) { }

  ngOnInit(): void {
  }

  selectedIds: number[] = [];

  get selectedIdsString(): string {
    return this.selectedIds.join(',');
  }

  onCardSelect(id: number, event: any): void {
    if (event.target.checked) {
      // Añadir el ID si se selecciona
      this.selectedIds.push(id);
    } else {
      // Eliminar el ID si se deselecciona
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
  }

  clearSelection(): void {
    this.selectedIds = []; // Vaciar el array de IDs seleccionados
    // Opcional: Desmarcar todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

  onOrderChange(order: string): void {
    this.selectedOrder = order;
  }

  getCurrentRentabilidad(funds: any[]): Observable<any>[] {
    return funds.map(fund =>
      this.appSrv.getCurrentRentabilidad(fund.secIdFondoMorningstar).pipe(
        map(rentabilidad => ({
          ...fund,
          netReturn1: rentabilidad.netReturn[0], // añade la info de rentabilidad al fondo
          netReturn3: rentabilidad.netReturn[1], // añade la info de rentabilidad
          rentabilidad // añade la info de rentabilidad al fondo
        }))
      )
    );
  }

  onShowNetReturn(): void {
    this.showNetReturn$.next(true);
  }

  trackByFn(index: number, item: any): string {
    return item.idFondo; // O cualquier propiedad única del objeto
  }
}
