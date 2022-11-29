import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddCategory} from "./add-category.component";

@Injectable()
export class AddCategoryService {
  constructor(private http: HttpClient) {
  }

  addCategory(addCategory: AddCategory){
    const formData = new FormData();
    formData.append('title', addCategory.title);
    formData.append('description', addCategory.description);
    formData.append('area', addCategory.area);
    formData.append('image', addCategory.image);
    return this.http.post('http://localhost:3000/category', formData)
  }
}
