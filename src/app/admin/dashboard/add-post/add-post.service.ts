import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddPost} from "./add-post.component";

@Injectable()
export class AddPostService {
  constructor(private http: HttpClient) {
  }

  addPost(addPostData: AddPost){
    const formData = new FormData();
    formData.append('title', addPostData.title);
    formData.append('tags', JSON.stringify(addPostData.tags));
    formData.append('area', addPostData.area);
    formData.append('image', addPostData.image);
    formData.append('body', addPostData.body);
    return this.http.post('http://localhost:3000/post', formData)
  }
}
