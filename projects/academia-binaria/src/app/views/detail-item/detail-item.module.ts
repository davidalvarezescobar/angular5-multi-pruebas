import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DetailItemComponent } from './detail-item.component';

const routes: Routes = [
  {path: '', component: DetailItemComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [DetailItemComponent]
})
export class DetailItemModule { }
