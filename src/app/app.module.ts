import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {GlobalPostService} from "./shared/global-post.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthIntercept} from "./admin/auth.intercept";
import {UserService} from "./admin/shared/user/user.service";
import {GlobalCategoryService} from "./shared/global-category.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercept, multi: true},
    UserService,
    GlobalPostService,
    GlobalCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
