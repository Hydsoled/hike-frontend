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
    formData.append('category', JSON.stringify(addPostData.category));
    formData.append('tags', JSON.stringify(addPostData.tags));
    formData.append('area', addPostData.area);
    formData.append('image', addPostData.image);
    formData.append('body', addPostData.body);
    for (let k in addPostData.bodyImages){
      formData.append('bodyImages', addPostData.bodyImages[k]);
    }
    return this.http.post('http://localhost:3000/post', formData)
  }

  deletePost(id: number){
    console.log(id);
    return this.http.delete('http://localhost:3000/post/' + id);
  }
}
