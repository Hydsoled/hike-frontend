import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth-guard.service";

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AuthComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [AuthService, AuthGuard],
  exports: [AdminRoutingModule],
})
export class AdminModule{
}
