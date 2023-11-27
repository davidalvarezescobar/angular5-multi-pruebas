import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Filter, ActiveFilter } from './model';
import { HttpClient } from '@angular/common/http';
import { tap, map, switchMap, combineLatest, timer, delay } from 'rxjs';
import { FiltersComponent } from './filters/filters.component';


@Component({
  selector: 'manage-your-filters-like-a-pro',
  template: `
    <app-filters [filters]="resourceType" group="type" (changeFilter)="kk($event)"></app-filters>
    <app-filters [filters]="levels" group="level"></app-filters>
  `,
  styles: []
})
export class App4Component implements OnInit, AfterViewInit {

  resourceType: Filter[];
  levels: Filter[];
  @ViewChildren(FiltersComponent) filters: QueryList<FiltersComponent>;


  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.loadFilterData();
  }


  ngAfterViewInit() {
    // accedemos a los observables 'changeFilter' de cada uno de los 2 componentes 'FiltersComponent';
    // en el dato 'filters' tendremos un array con cada uno de ellos:
    const filters = this.filters.map(f => f.changeFilter);

    const resources = combineLatest(filters).pipe(
      tap(arr => console.log('Array con la info "conbinada" ', arr)),
      map(arr => {
        const filters = arr.map((filter: ActiveFilter) => `${filter.group}=${filter.id}`);
        return filters.join('&');
      }),
      switchMap(this.getData)
    );

    resources.subscribe(data => {
      console.log('Filtro aplicado: ', data);
    });
  }


  loadFilterData() {
    this.http.get('../assets/filters.json').pipe(delay(1000)).subscribe(data => {
      this.resourceType = data['resourceType'];
      this.levels = data['levels'];
    });
  }


  getData(query) {
    // Simulate HTTP request..
    return timer(1000).pipe(
      map(() => 'https://api.com?' + query)
    );
  }


  kk(e) {
    alert('4) ' + JSON.stringify(e));
  }

}
