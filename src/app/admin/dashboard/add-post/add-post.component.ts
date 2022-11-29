import {Component, OnDestroy} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {NgForm} from "@angular/forms";
import * as customEditor from "src/app/lib/ckeditor/build/ckeditor";
import {AddPostService} from "./add-post.service";
import {ReplaySubject, takeUntil} from "rxjs";
export interface Tag {
  name: string;
}

export interface AddPost {
  title: string;
  area: string;
  image: File;
  tags: string[];
  body: string;
}
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnDestroy{
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  image!: File;
  tags: Tag[] = [];
  areaValue: 'world' | 'georgia' | 'interview' | 'blog' = 'world';
  addPostData: AddPost = {title: '', body: '', area: '', tags: [], image: this.image};
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Editor = customEditor;
  addOnBlur = true;
  editorData = '';
  imageName: string = 'სურათი არ არის ატვირთული';

  constructor(private addPostService: AddPostService) {
  }

  addPost(form: NgForm){
    this.addPostData.title = form.form.value.title;
    this.addPostData.area = form.form.value.area;
    this.addPostData.image = this.image;
    this.addPostData.body = this.editorData;
    this.tags.forEach((obj)=>{
      this.addPostData.tags.push(obj.name);
    });
    this.addPostService.addPost(this.addPostData)
      .pipe(takeUntil(this.$destroy))
      .subscribe((val)=>{
        console.log(val);
      });
  }

  uploadImage(fileInputEvent: any) {
    this.image = fileInputEvent.target.files[0];
    this.imageName = this.image.name;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push({name: value});
    }
    event.chipInput!.clear();
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editTag(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeTag(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index > 0) {
      this.tags[index].name = value;
    }
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
