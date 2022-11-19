import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth-guard.service";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent},
  {path: '**', redirectTo: 'dashboard'}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule{}
