import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations.component';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  {path: "", component: OperationsComponent}
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [
    OperationsComponent,
    NewComponent,
    ListComponent
  ]
})
export class OperationsModule { }
