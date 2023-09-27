import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', loadChildren: () => import('./views/profile/profile.module').then((m) => m.ProfileModule)},
  {path: 'about', loadChildren: () => import('./views/about/about.module').then((m) => m.AboutModule)},
  {path: 'operations', loadChildren: () => import('./views/operations/operations.module').then((m) => m.OperationsModule)},
  {path: 'item/:id', loadChildren: () => import('./views/detail-item/detail-item.module').then((m) => m.DetailItemModule)},
  {path: '**', redirectTo: 'home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
