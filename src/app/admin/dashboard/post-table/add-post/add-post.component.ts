import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, NgForm} from "@angular/forms";
import * as customEditor from "src/app/lib/ckeditor/build/ckeditor";
import {AddPostService} from "./add-post.service";
import {mergeMap, ReplaySubject, startWith, takeUntil} from "rxjs";
import {GlobalCategoryService} from "../../../../shared/global-category.service";
import {ImageFilter} from "../../../shared/filters/image.filter";
import {ActivatedRoute, Data, Router} from "@angular/router";

export interface Tag {
  name: string;
}
export interface Category {
  id: number;
  name: string;
}

export interface AddPost {
  title: string;
  area: 'world' | 'georgia' | 'interview' | 'blog';
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
export class AddPostComponent implements OnInit, OnDestroy {
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  postId: number = 0;
  myControl = new FormControl('');
  categories: Category[] = [];
  image!: File;
  tags: Tag[] = [];
  addPostData: AddPost = {
    title: '',
    area: 'world',
    category: 0,
    image: this.image,
    tags: [],
    body: '',
    bodyImages: [],
  };
  Editor = customEditor;
  addOnBlur = true;
  imageName: string = 'სურათი არ არის ატვირთული';

  constructor(
    private addPostService: AddPostService,
    private globalCategoryService: GlobalCategoryService,
    private imageFilter: ImageFilter,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: Data) => {
        const post = data['post'];
        if (post) {
          this.postId = post.id;
          this.addPostData.title = post.title;
          this.addPostData.body = post.body;
          this.addPostData.area = post.area;
          if (post.category){
            this.addPostData.category =post.category.id;
          }
          post.tag.forEach((tag: any) => {
            this.tags.push({name: tag.name});
          });
        }
      });
    this.myControl.valueChanges.pipe(
      startWith(''),
      takeUntil(this.$destroy),
      mergeMap((value) => {
        const filters: any = {};
        filters.title = value;
        filters.size = 3;
        return this.globalCategoryService.getCategoryByQuery(filters);
      }),
    ).subscribe((val: any) => {
      this.categories = [];
      val.category.forEach((category: any) => {
        this.categories.push({id: category.category_id, name: category.category_title});
      })
    });
  }

  addPost(form: NgForm) {
    this.addPostData.title = form.form.value.title;
    this.addPostData.area = form.form.value.area;
    this.addPostData.tags = this.tags.map((tag)=> tag.name);
    this.addPostData.image = this.image;
    [this.addPostData.bodyImages, this.addPostData.body] = this.imageFilter.extractImageFromBody(this.addPostData.body, this.addPostData.title);
    this.addPostService.addPost(this.addPostData)
      .pipe(takeUntil(this.$destroy))
      .subscribe((val) => {
        this.router.navigate(['/admin/dashboard']);
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

  categorySelected(option: string) {
    const category = this.categories.filter(category => category.name === option);
    this.addPostData.category = category[0].id;
  }

  deletePost(id: number){
    this.addPostService
      .deletePost(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data)=>{
        this.router.navigate(['/admin/dashboard']);
    });
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.complete();
  }
}
