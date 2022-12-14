import {NgModule} from "@angular/core";
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth-guard.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingComponent} from "./shared/loading/loading.component";
import {DashboardService} from "./dashboard/dashboard.service";
import {PostTableComponent} from "./dashboard/post-table/post-table.component";
import {AddPostComponent} from "./dashboard/post-table/add-post/add-post.component";
import {AddCategoryComponent} from "./dashboard/category-table/add-category/add-category.component";
import {UserComponent} from "./dashboard/user/user.component";
import {MatModule} from "./mat.module";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {AddPostService} from "./dashboard/post-table/add-post/add-post.service";
import {AddCategoryService} from "./dashboard/category-table/add-category/add-category.service";
import {CategoryTableService} from "./dashboard/category-table/category-table.service";
import {CategoryTableComponent} from "./dashboard/category-table/category-table.component";
import {ImageFilter} from "./shared/filters/image.filter";
import {AddPostResolver} from "./dashboard/post-table/add-post/add-post.resolver";

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
    CategoryTableComponent,
  ],
  imports: [
    MatModule,
    CKEditorModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DashboardService,
    AddPostService,
    AddCategoryService,
    CategoryTableService,
    ImageFilter,
    AddPostResolver
  ],
  exports: [AdminRoutingModule],
})
export class AdminModule{
}
