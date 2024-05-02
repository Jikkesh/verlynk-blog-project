import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { BlogService } from '../../services/blog/blog.service';
import { Blog } from '../../interfaces/Blog';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {

  editForm: FormGroup;
  postedBy: string = "";
  private _id;

  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router) {

    this.editForm = this.formBuilder.group({
      title: "",
      description: ""
    });

  }

  ngOnInit(): void {

    this._id = this.route.snapshot.paramMap.get('id')

    this.blogService.getBlog(this._id).subscribe((result) => {

      const { title, description, postedBy } = result.data;
      this.postedBy = postedBy;

      this.editForm = this.formBuilder.group({
        title: title,
        description: description
      });

    });
  }


  handleBack() {
    this.router.navigate([""]);
  }



  onSubmit() {
    const body = this.editForm.value;
    
    this.blogService.updateBlog(this._id, body).subscribe((result) => {
      if (result.status == 200) {
        console.log(result.message)
        this.router.navigate(["/"]);
      }
      else if (result.status == 404) {
        alert("Blog not found on Server,Refresh to get recent blogs");
        console.log(result.message)
      }
      else {
        alert("Something went wrong on server");
        console.log(result.message)
      }
    });

  }


}
