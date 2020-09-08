import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './services/auth/auth-guard.service';
import {DemandesComponent} from './demandes/demandes.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'demandes', component: DemandesComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
