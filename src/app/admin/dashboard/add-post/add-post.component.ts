import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, NgForm} from "@angular/forms";
import * as customEditor from "src/app/lib/ckeditor/build/ckeditor";
import {AddPostService} from "./add-post.service";
import {mergeMap, ReplaySubject, startWith, takeUntil} from "rxjs";
import {GlobalCategoryService} from "../../../shared/global-category.service";
import {ImageFilter} from "../../shared/filters/image.filter";

export interface Tag {
  name: string;
}

export interface AddPost {
  title: string;
  area: string;
  category: number;
  image: File;
  tags: string[];
  body: string;
  bodyImages: [];
}
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, OnDestroy{
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  myControl = new FormControl('');
  categories: {name: string, id: number}[] = [];
  image!: File;
  tags: Tag[] = [];
  areaValue: 'world' | 'georgia' | 'interview' | 'blog' = 'world';
  addPostData: AddPost = {title: '', body: '', area: '', category: 0, tags: [], image: this.image, bodyImages: []};
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  Editor = customEditor;
  addOnBlur = true;
  editorData = '';
  imageName: string = 'სურათი არ არის ატვირთული';

  constructor(
    private addPostService: AddPostService,
    private globalCategoryService: GlobalCategoryService,
    private imageFilter: ImageFilter,
  ) {
  }

  ngOnInit() {
    this.myControl.valueChanges.pipe(
      startWith(''),
      takeUntil(this.$destroy),
      mergeMap((value) => {
        const filters: any = {};
        filters.title = value;
        filters.size = 3;
        return this.globalCategoryService.getCategoryByQuery(filters);
      }),
    ).subscribe((val: any)=>{
      this.categories = [];
      val[0].forEach((category: any)=>{
        this.categories.push({id: category.c_id, name: category.c_title});
      })
    });
  }

  addPost(form: NgForm){
    this.addPostData.title = form.form.value.title;
    this.addPostData.area = form.form.value.area;
    this.addPostData.image = this.image;
    [this.addPostData.bodyImages, this.addPostData.body] = this.imageFilter.extractImageFromBody(this.editorData, this.addPostData.title);
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

  categorySelected(option: string){
    const category = this.categories.filter(category => category.name === option);
    this.addPostData.category = category[0].id;
  }
}
