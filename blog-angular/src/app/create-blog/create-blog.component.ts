import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog, BlogCreate } from '../Model/Model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private blogService:BlogService, private router:Router) { }
  title:string=""
  content:string=""
  image:string=""
  selectedFile:File |null=null

  stringUser(){
    var u:any = localStorage.getItem("user")?.toString()
    if(u==undefined)u=""
    return u
  }

  blog:BlogCreate|Blog|any={
    title:"",
    content:"",
    image:"",
    user:JSON.parse(this.stringUser())
  }
  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0]
    const reader=new FileReader()
    reader.onload=()=>{
      this.blog.image=reader.result as string;
    }
    reader.readAsDataURL(this.selectedFile)
  }

  createBlog(){
    this.blogService.createBlog({title:this.blog.title, content:this.blog.content, image:this.selectedFile})
    .subscribe({
      next:this.handleCreate,
      error:(err)=>console.log(err)
    })
  }

  handleCreate(data:Blog|any){
    this.blog=data
    this.router.navigateByUrl("")
  }

}
