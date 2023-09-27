import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  {path: 'heroes', loadChildren: () => import('./heroes/heroes.module').then((m) => m.HeroesModule)},
  {path: 'detail/:id', loadChildren: () => import('./hero-detail/hero-detail-routing.module').then((m) => m.HeroDetailRoutingModule)},
  // {path:'detail/:id', loadChildren:'./hero-detail/hero-detail.module#HeroDetailModule'}, // no funciona
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)}
  // {path:'**', redirectTo:'heroes'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
