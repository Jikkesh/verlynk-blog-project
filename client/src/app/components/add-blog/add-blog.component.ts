import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BlogService } from '../../services/blog/blog.service';
import * as jwt_decode from 'jwt-decode';
import { Blog } from '../../interfaces/Blog';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() : void {
    this.addForm = this.formBuilder.group({
      title: null,
      description: null,
      postedBy: null
    });
  }

  handleBack(): void {
    this.router.navigate([""]);
  }

  getTokenDecode(): any {
    const token = localStorage.getItem("USER_TOKEN");
    const decoded: any = jwt_decode.jwtDecode(token);
    if (decoded) {
      console.log(decoded)
      return decoded;
    }
    else {
      return null;
    }
  }

  onSubmit(): void {
    const info = this.getTokenDecode();

    if (info) {
      var { name } = info;
    }
    this.addForm.value.postedBy = name;

    const body: Blog = this.addForm.value
    this.blogService.addBlog(body).subscribe((result) => {

      if (result.status == 200) {
        this.addForm.reset(),
          this.router.navigate(["/"])
      }

    }, (error) => {
      alert("Something went wrong on server, Try again later");
      console.error(error.message);
      this.router.navigate([""]);
    })

  }




}
