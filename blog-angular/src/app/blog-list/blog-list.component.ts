import { Component, OnInit } from '@angular/core';
import { Blog } from '../Model/Model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blog_list:Blog[] |any=[]
  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.getBlog()
  }

  getBlog(){
    this.blogService.getBlogs().subscribe({
        next:(res)=>this.blog_list=res.body,
        error:(err)=>console.log(err)
    })
  }

}
