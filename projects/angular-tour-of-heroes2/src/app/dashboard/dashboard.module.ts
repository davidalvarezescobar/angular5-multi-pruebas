import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';


const routes: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, HeroSearchComponent],
  exports: []
})
export class DashboardModule { }
