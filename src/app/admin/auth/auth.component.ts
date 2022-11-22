import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ReplaySubject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy, OnInit{
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading = false;
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.authService.isActivated) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit(form: NgForm) {
    this.email = form.form.value.email;
    this.password = form.form.value.password;
    this.isLoading = true;
    this.authService
      .login(form.form.value)
      .pipe(
        takeUntil(this.$destroy),
        )
      .subscribe(
        (value: any) => {
          this.isLoading = false;
          console.log(value);
          this.router.navigate(['/admin/dashboard']);
          },
        (error) => {
          this.isLoading = false;
          this.error = error;
        }
    );
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
