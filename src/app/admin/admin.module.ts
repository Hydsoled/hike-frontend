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
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthIntercept} from "./auth.intercept";
import {LoadingComponent} from "./shared/loading/loading.component";
import {DashboardService} from "./dashboard/dashboard.service";
import {UserService} from "./shared/user/user.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {PostTableComponent} from "./dashboard/post-table/post-table.component";
import {AddPostComponent} from "./dashboard/add-post/add-post.component";
import {AddCategoryComponent} from "./dashboard/add-category/add-category.component";
import {UserComponent} from "./dashboard/user/user.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AuthComponent,
    LoadingComponent,
    PostTableComponent,
    AddPostComponent,
    AddCategoryComponent,
    UserComponent,
  ],
  imports: [
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AdminRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true},
    AuthService,
    AuthGuard,
    DashboardService,
    UserService
  ],
  exports: [AdminRoutingModule],
})
export class AdminModule{
}
