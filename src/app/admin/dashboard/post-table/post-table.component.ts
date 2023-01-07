import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {GlobalPostService} from "../../../shared/global-post.service";
import {ReplaySubject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

export interface Post {
  id: string;
  title: string;
  user: string;
  area: string;
  createdAt: string;
  updatedAt: string;
}
@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss']
})
export class PostTableComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'user', 'area', 'createdAt', 'updatedAt'];
  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  filterValues: any = {};
  dataSource = new MatTableDataSource<Post>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(
    private globalPostService: GlobalPostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.filterChange();
  }

  filterChange(){
    this.globalPostService
      .getPostByQuery(this.filterValues)
      .pipe(
        takeUntil(this.$destroy),
      )
      .subscribe(
        (data: any) => {
          const posts = [];
          for (const post of data.post){
            posts.push({
              id: post.p_id,
              title: post.p_title,
              area: post.p_area,
              createdAt: post.p_createdAt,
              updatedAt: post.p_updatedAt,
              user: post.firstName + ' ' + post.lastName,
            });
          }
          this.length = data.count;
          this.dataSource = new MatTableDataSource(posts);
        }
      );
  }

  async paginationChange (data: any){
    this.filterValues.size = data.pageSize;
    this.filterValues.index = data.pageIndex;
    this.filterChange();
  }

  onPostClick(row: Post){
    this.router.navigate(['add-post', row.id], {relativeTo: this.route});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
