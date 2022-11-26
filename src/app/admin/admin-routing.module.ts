import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth-guard.service";
import {PostTableComponent} from "./dashboard/post-table/post-table.component";
import {AddPostComponent} from "./dashboard/add-post/add-post.component";
import {AddCategoryComponent} from "./dashboard/add-category/add-category.component";
import {UserComponent} from "./dashboard/user/user.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent,
    children: [
      {path: '', component: PostTableComponent},
      {path: 'add-post', component: AddPostComponent},
      {path: 'add-category', component: AddCategoryComponent},
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
