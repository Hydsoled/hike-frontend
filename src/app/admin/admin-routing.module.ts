import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth-guard.service";
import {PostTableComponent} from "./dashboard/post-table/post-table.component";
import {AddPostComponent} from "./dashboard/add-post/add-post.component";
import {AddCategoryComponent} from "./dashboard/add-category/add-category.component";
import {UserComponent} from "./dashboard/user/user.component";
import {CategoryTableComponent} from "./dashboard/category-table/category-table.component";
import {AddPostResolver} from "./dashboard/add-post/add-post.resolver";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
    children: [
      {path: '', component: PostTableComponent},
      {path: 'category', component: CategoryTableComponent},
      {path: 'add-post', component: AddPostComponent},
      {path: 'add-post/:id', component: AddPostComponent, resolve: { post: AddPostResolver }},
      {path: 'add-category', component: AddCategoryComponent},
      {path: 'add-category/:id', component: AddCategoryComponent},
      {path: 'user', component: UserComponent},
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule{}
