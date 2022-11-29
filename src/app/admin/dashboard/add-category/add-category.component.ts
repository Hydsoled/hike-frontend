import { Component } from '@angular/core';
import {ReplaySubject, takeUntil} from "rxjs";
import {NgForm} from "@angular/forms";
import {AddCategoryService} from "./add-category.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface AddCategory {
  title: string;
  description: string;
  area: string;
  image: File;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  private $destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  image!: File;
  areaValue: 'world' | 'georgia' | 'interview' | 'blog' = 'world';
  addCategoryData: AddCategory = {title: '', description: '', area: '', image: this.image};
  imageName: string = 'სურათი არ არის ატვირთული';

  constructor(private addCategoryService: AddCategoryService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  addCategory(form: NgForm){
    this.addCategoryData.title = form.form.value.title;
    this.addCategoryData.description = form.form.value.description;
    this.addCategoryData.area = form.form.value.area;
    this.addCategoryData.image = this.image;
    this.addCategoryService.addCategory(this.addCategoryData)
      .pipe(takeUntil(this.$destroy))
      .subscribe((val)=>{
        this.router.navigate(['category'], {relativeTo: this.route.parent});
      });
  }

  uploadImage(fileInputEvent: any) {
    this.image = fileInputEvent.target.files[0];
    this.imageName = this.image.name;
  }
}
