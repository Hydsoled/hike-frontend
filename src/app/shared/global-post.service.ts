import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GlobalPostService {
  constructor(private http: HttpClient) {
  }

  getPostByQuery(filterBy: any){
    const params: any = {};
    for (const filters in filterBy){
      if (filterBy[filters]){
        params[filters] = filterBy[filters];
      }
    }
    return this.http.get('http://localhost:3000/post', {
      params: params,
    });
  }
}
