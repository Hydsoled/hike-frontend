import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DashboardService{
  constructor(private http: HttpClient) {
  }

  getCurrentUser(){
    return this.http.get('http://localhost:3000/user');
  }
}
