import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: './pages/home/home.module#HomePageModule', 
    canActivate: [AuthGuard]
  },
  { path: 'detail/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
