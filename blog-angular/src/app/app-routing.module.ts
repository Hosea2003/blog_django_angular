import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { GuardGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {component:MainPageComponent, path:"",
  children:[
    {path:"", component:BlogListComponent},
    {path:"create", component:CreateBlogComponent}
  ]
},
  {component:LoginComponent, path:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
