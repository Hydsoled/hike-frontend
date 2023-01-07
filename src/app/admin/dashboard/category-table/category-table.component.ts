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
      )
      .subscribe(
        (data: any) => {
          const categories = [];
          for (const category of data.category){
            categories.push({
              id: category.category_id,
              title: category.category_title,
              area: category.category_area,
              createdAt: category.category_createdAt,
              updatedAt: category.category_updatedAt,
              user: category.firstName + ' ' + category.lastName,
            });
          }
          this.length = data.count;
          this.dataSource = new MatTableDataSource(categories);
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
