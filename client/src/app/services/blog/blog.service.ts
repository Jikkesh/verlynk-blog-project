import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../interfaces/Blog';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private _url: string = "http://localhost:5000/data";


  constructor(private http: HttpClient,
    private authService: AuthService
  ) {}


  getBlogs(startIndex: number, endIndex: number): Observable<any> {
    return this.http.get(`${this._url}/blog?startIndex=${startIndex}&&endIndex=${endIndex}`);
  }

  getBlogCount(): Observable<any> {
    return this.http.get(`${this._url}/blogcount`);
  }

  addBlog(body: Blog): Observable<any> {

    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.post(`${this._url}/blog`, body, { headers });
  }

  deleteBlog(id): Observable<any> {
    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.delete(`${this._url}/blog/${id}`, { headers });
  }

  updateBlog(id, body): Observable<any> {
    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.patch(`${this._url}/blog/${id}`, body, { headers});
  }

  getBlog(id: any): Observable<any> {
    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.get(`${this._url}/blog/${id}`, { headers });
  }

  addComment(blog_id, body): Observable<any> {
    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.post(`${this._url}/blog/${blog_id}/comment`, body, { headers });
  }

  deleteComment(blog_id, comment_id) {
    const token : string = localStorage.getItem("USER_TOKEN")
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `${token}`);
    return this.http.delete(`${this._url}/blog/${blog_id}/comment/${comment_id}`, { headers });
  }





}
