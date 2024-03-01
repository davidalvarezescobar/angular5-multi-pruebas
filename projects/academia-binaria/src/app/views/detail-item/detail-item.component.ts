import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from '../operations/operations.service';
import { Operation } from '../operations/operation';


@Component({
  selector: 'app-detail-item',
  template: `
    <p>detail-item.component:</p>
    <h3>{{ operation | json }}</h3>
  `,
  styles: [`
  :host {
    background-color: antiquewhite;
    display: block;
  }
`]
})
export class DetailItemComponent implements OnInit {
  operation: Operation;

  constructor(
    private route: ActivatedRoute,
    private operationsService: OperationsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.operation = this.operationsService.getOperationById(id);
  }

}
