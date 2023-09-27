import { Attribute, ChangeDetectorRef, Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ActiveFilter, Filter } from '../model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() filters: Filter[] = [];
  @Output() changeFilter = new Subject<ActiveFilter>();

  constructor(
    // tslint:disable-next-line:max-line-length
    @Attribute('group') private group: string, // @Attribute('group') -> nombre del dato fuera de la clase; private group -> nombre del dato dentro de la clase
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // éste código no funciona en el onInit porque los datos que recibe el @Input "filters" son asincronos
    if (this.filters) {
      const initialFilter = this.filters.find(f => f.active); // devuelve el filtro que tenga la prop active a true
      this.refresh(initialFilter);
      console.log('4) Grupo: ', this.group);
      setTimeout(() => this.cdr.detach());
    }
  }

  select(filter: Filter) {
    this.filters.find(f => f.active).active = false;
    filter.active = true;
    this.refresh(filter);
    this.cdr.detectChanges();
  }

  private refresh(filter) {
    this.changeFilter.next({
      id: filter.id,
      group: this.group
    });
  }
}
