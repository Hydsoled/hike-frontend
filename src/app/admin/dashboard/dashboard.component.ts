import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable, ReplaySubject, take, takeUntil} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {DashboardService} from "./dashboard.service";
import {UserService} from "../shared/user/user.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  myUser!: User;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
  ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit() {
    this.userService
      .user
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (value) => {
          this.myUser = value;
        }
      )
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
