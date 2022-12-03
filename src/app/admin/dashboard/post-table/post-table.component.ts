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
        map((data: any) => {
          const modifyData: any = {};
          modifyData.data= data[0];
          modifyData.total = data[1];
          return modifyData;
        })
      )
      .subscribe(
        (posts: any) => {
          const data = [];
          for (const val in posts.data){
            data.push({
              id: posts.data[val].p_id,
              title: posts.data[val].p_title,
              area: posts.data[val].p_area,
              createdAt: posts.data[val].p_createdAt,
              updatedAt: posts.data[val].p_updatedAt,
              user: posts.data[val].firstName + ' ' + posts.data[val].lastName,
            });
          }
          this.length = posts.total;
          this.dataSource = new MatTableDataSource(data);
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
