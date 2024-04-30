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

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: "",
      description: "",
      postedBy: "",
      comments: []
    });
  }

  getUserName() {
    const token = localStorage.getItem("USER_TOKEN");
    const decoded :any = jwt_decode.jwtDecode(token);
    if (decoded) {
      console.log(decoded)
      return decoded;
    }
    else {
      return null
    }
  }

  onSubmit() {
  
    const info  = this.getUserName();
    if(info){
      var {name} = info;
    }
    this.addForm.value.postedBy = name;

    const body: Blog = this.addForm.value
    this.blogService.addBlog(body).subscribe((result) => {

      if (result.status == 200) {
        console.log(result),
          this.addForm.reset(),
          this.router.navigate(["/"])
      }
      else {
        alert("Something went wrong on server")
      }

    })



  }




}
