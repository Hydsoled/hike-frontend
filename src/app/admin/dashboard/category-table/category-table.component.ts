import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ReplaySubject, takeUntil} from "rxjs";
import {GlobalCategoryService} from "../../../shared/global-category.service";
import {map} from "rxjs/operators";
export interface Category {
  id: string;
  title: string;
  user: string;
  area: string;
  createdAt: string;
  updatedAt: string;
}
@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']

})
export class CategoryTableComponent implements OnInit, OnDestroy, AfterViewInit{
  displayedColumns: string[] = ['id', 'title', 'user', 'area', 'createdAt', 'updatedAt'];

  length!: number;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  filterValues: any = {};
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  clickedRows = new Set<Category>();
  constructor(private globalCategoryService: GlobalCategoryService) {
  }

  ngOnInit(): void {
    this.filterChange();
  }

  filterChange(){
    this.globalCategoryService
      .getCategoryByQuery(this.filterValues)
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
              id: posts.data[val].c_id,
              title: posts.data[val].c_title,
              area: posts.data[val].c_area,
              createdAt: posts.data[val].c_createdAt,
              updatedAt: posts.data[val].c_updatedAt,
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
