import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GlobalCategoryService{

  constructor(private http: HttpClient) {
  }

  getCategoryByQuery(filterBy: any){
    const params: any = {};
    for (const filters in filterBy){
      if (filterBy[filters]){
        params[filters] = filterBy[filters];
      }
    }
    return this.http.get('http://localhost:3000/category', {
      params: params,
    });
  }
}
