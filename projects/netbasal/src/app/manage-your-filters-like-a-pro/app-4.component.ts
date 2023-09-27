import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Filter, ActiveFilter } from './model';
import { HttpClient } from '@angular/common/http';
import { tap, map, mapTo, switchMap, combineLatest, timer } from 'rxjs';
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


  constructor(private http: HttpClient) {
  }


  ngOnInit() {
    this.loadFilterData();
  }


  ngAfterViewInit() {
                  console.log('4) La queryList con los filtros ', this.filters);
    const filters = this.filters.map(f => f.changeFilter);
                  console.log('4) Array con los eventEmitter de cada filtro ', filters);

    const resources = combineLatest(filters).pipe(
      tap(arr =>  console.log('4) Array con la info "conbinada" ', arr)),
      map(arr => {
        return arr.map( (filter: ActiveFilter) => `${filter.group}=${filter.id}`).join('&');
      }),
      switchMap(this.getData)
    );

    resources.subscribe(data => {
                  console.log('4) Resultado: ', data);
    });
  }


  loadFilterData() {
    this.http.get('../assets/filters.json').subscribe(data => {
      this.resourceType = data['resourceType'];
      this.levels = data['levels'];
    });
  }


  getData( query ) {
    // Simulate HTTP request..
    return timer(1000).pipe(
      mapTo('https://api.com?' + query)
    );
  }


  kk(e) {
    // alert('4) ' + JSON.stringify(e));
  }

}
