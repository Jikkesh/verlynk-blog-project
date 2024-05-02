import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../interfaces/Blog';
import { BlogService } from '../../services/blog/blog.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-blog-box',
  templateUrl: './blog-box.component.html',
  styleUrl: './blog-box.component.css'
})
export class BlogBoxComponent implements OnInit {

  blogData: Blog[];
  isBlogData: boolean = false;

  newComment: string;

  private start: number = 0;
  private limit: number = 5;

  private totalBlog: number;

  constructor(private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.blogService.getBlogCount().subscribe((result) => {
      this.totalBlog = result.data
    }, (error) => {
      console.error(error.message);
    });

    const start = this.start;
    const end = this.limit;

    this.blogService.getBlogs(start, end).subscribe(
      (result) => {
        this.blogData = result.data
        this.isBlogData = true;
      }, (error) => {
        console.error(error.message);
      });

  }

  getTokenDecode(): any {
    const token = localStorage.getItem("USER_TOKEN");
    const decoded: any = jwt_decode.jwtDecode(token);
    if (decoded) {
      return  decoded ;
    }
    else {
      return null
    }
  }

  handleAdd(): void {
    if (!localStorage.getItem("USER_TOKEN")) {
      alert("Login to access Blog")
      return;
    } else {
      this.router.navigate(["add-blog"]);
    }

  }


  handleDelete(id: string): void {
    if (!localStorage.getItem("USER_TOKEN")) {
      alert("Login to access Blog")
      return;
    }
    var updatedBlog: Blog[];
    this.blogService.deleteBlog(id).subscribe((result) => {

      if (result.status == 200) {
        this.totalBlog--;
        updatedBlog = this.blogData.filter((blog) => blog._id !== id),
          this.blogData = updatedBlog;
      }
    }, (error) => {
      if (error.status = 404) {
        alert(error.message)
      }
      else {
        alert(error.message)
      }

    });
  }


  handleUpdate(id: string): void {
    if (!localStorage.getItem("USER_TOKEN")) {
      alert("Login to access Blog")
      return;
    }
    this.router.navigate(["edit-blog", `${id}`])
  }


  handleAddComment(blog_id: string) {
    if (!localStorage.getItem("USER_TOKEN")) {
      alert("Login to access Blog")
      return;
    }

    const info = this.getTokenDecode();
    if (info) {
      var { name } = info;
    }
    const body = { userName: name, text: this.newComment }

    this.blogService.addComment(blog_id, body).subscribe((result) => {
      if (result.status == 200) {
        this.blogData.map((blog) => {
          if (blog._id == blog_id) {
            blog.comments.push({
              text: body.text,
              commentedBy: body.userName
            });
          }
        })
      }
      else {
        alert(`${result.message}`)
      }
    });
  }


  handleCommentDelete(blog_id, comment_id): void {

    if (!localStorage.getItem("USER_TOKEN")) {
      alert("Login to access Blog")
      return;
    }
    this.blogService.deleteComment(blog_id, comment_id).subscribe((result: any) => {
      if (result.status == 200) {
        this.blogData.map((blog) => {
          if (blog._id == blog_id) {
            const temp = blog.comments.filter((comment, index) => index !== comment_id)
            blog.comments = temp;
          }
        });
      }
    }, (error) => {
      console.error(error.message);
      alert("Something went wrong on server, Try again later");
    });

  }


  //Pagination

  isFirstPage(): boolean {
    if (this.start <= 0) {
      return true;
    }
    else {
      return false;
    }
  }

  isLastPage(): boolean {
    if (this.start >= this.totalBlog - 5) {
      return true;
    }
    else {
      return false;
    }
  }

  hanldePrevious(): void {

    if (this.start <= 0) {
      alert("Previous end reached");
      return;
    }

    this.start = this.start - this.limit;
    this.isBlogData = false;
    this.blogService.getBlogs(this.start, this.limit).subscribe(
      (result) => {
        console.log(result)
        this.blogData = result.data
        this.isBlogData = true;
      });

  }

  handleNext(): void {
    if (this.start >= this.totalBlog - 5) {
      alert("Total Blog reached");
      return;
    }

    this.start = this.start + this.limit;
    this.isBlogData = false;
    this.blogService.getBlogs(this.start, this.limit).subscribe(
      (result) => {
        console.log(result)
        this.blogData = result.data
        this.isBlogData = true;
      });

  }




}
