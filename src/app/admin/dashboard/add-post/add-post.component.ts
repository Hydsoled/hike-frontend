import { Component } from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {NgForm} from "@angular/forms";
export interface Tag {
  name: string;
}
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  addOnBlur = true;
  areaValue: 'world' | 'georgia' | 'interview' | 'blog' = 'world';
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  imageName: string = 'სურათი არ არის ატვირთული';
  file: any;

  addPost(form: NgForm){
    console.log(form);
  }

  uploadImage(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.imageName = this.file.name;
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
}
