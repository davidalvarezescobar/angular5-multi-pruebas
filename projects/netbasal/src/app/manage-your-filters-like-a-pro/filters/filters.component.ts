import { Attribute, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ActiveFilter, Filter } from '../model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnChanges, OnDestroy {
  @Input() filters: Filter[] = [];
  // la gracia de este ejercicio es prescindir de datos de salida (@Output) y, acceder a esa info mediante ViewChild
  // por ese motivo, comento esta línea:
  // @Output() changeFilter = new Subject<ActiveFilter>();

  // y dejo el dato 'changeFilter' simplemente como público:
  public changeFilter = new Subject<ActiveFilter>();


  constructor(
    // tslint:disable-next-line:max-line-length
    @Attribute('group') private group: string, // @Attribute('group') -> nombre del dato fuera de la clase; private group -> nombre del dato dentro de la clase
    private cdr: ChangeDetectorRef
  ) { }


  ngOnChanges(changes: SimpleChanges) {
    console.log(`changes: ${this.group}:`, changes);
    // éste código no funciona en el onInit porque los datos que recibe el @Input "filters" son asincronos (aun podríamos haber puesto un setter)
    // En lugar de acceder a 'filters' mediante el objeto 'changes', utilizo otra alternativa -> observar cuando 'filters' recibe los datos:
    if (this.filters) {
      const initialFilter = this.filters.find(f => f.active); // devuelve el filtro que tenga la prop active a true
      // emitimos nada mas cargar el filtro (para que así pueda funcionar el 'combineLatest'):
      this.notify(initialFilter);
      setTimeout(() => this.cdr.detach());
    }
  }

  select(filter: Filter) {
    // ponemos a false el filtro activo actual (ya no estará activo);
    this.filters.find(f => f.active).active = false;
    // declaramos activo el nuevo filtro que recibimos por parámetro:
    filter.active = true;
    this.notify(filter);
    this.cdr.detectChanges();
  }

  private notify(filter) {
    this.changeFilter.next({
      id: filter.id,
      group: this.group
    });
  }

  ngOnDestroy(): void {
    // en el ejercicio, Netbasal se desuscribe desde aquí;
    // no sé si será lo correcto, pero yo lo hubiera hecho desde el componente padre:
    this.changeFilter.unsubscribe();
  }
}
