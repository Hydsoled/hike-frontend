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
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthIntercept} from "./auth.intercept";
import {LoadingComponent} from "./shared/loading/loading.component";

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AuthComponent,
    LoadingComponent
  ],
    imports: [
        HttpClientModule,
        AdminRoutingModule,
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        FormsModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true},
    AuthService,
    AuthGuard
  ],
  exports: [AdminRoutingModule],
})
export class AdminModule{
}
