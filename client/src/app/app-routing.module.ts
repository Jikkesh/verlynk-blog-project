import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogBoxComponent } from './components/blog-box/blog-box.component';
import { LoginComponent } from './components/login/login.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { SignupComponent } from './components/signup/signup.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';

const routes: Routes = [
  {path:"" , component:BlogBoxComponent},
  {path:"login" , component: LoginComponent},
  {path:"signup" , component:SignupComponent},
  {path:"add-blog" , component:AddBlogComponent},
  {path:"edit-blog/:id" , component:EditBlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
