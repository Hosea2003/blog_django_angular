import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Blog, BlogCreate } from '../Model/Model';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  more=false
  content_class="content-text"
  view_more="View more"
  constructor(private blogService:BlogService) { }
 
  @Input() blog:Blog|BlogCreate|any={
    title:"",
    pk:0,
    content:"",
    created:"",
    updated:"",
    url:"",
    image:"" ,
    user:{pk:0, username:""},
    likes:0,
    liked:null
  }

  @Input() actionVisible:boolean=true

  commentForm=new FormGroup({
    comment:new FormControl()
  })

  commentList:any[]=[]
  display="display:none;"
  likeColor="color:black;"
  

  ngOnInit(): void {
    this.likeColor=this.blog.liked?"color:#05aefc;":"color:black;"
  }

  viewMore(){
    if(this.more){
      this.more=false
      this.content_class="content-text"
      this.view_more="View more"
    }
    else{
      this.more=true
      this.content_class="more"
      this.view_more="View less"
    }
  }

  like(){
    this.blogService.likeBlog(this.blog.pk).subscribe({
      next:(res)=>{
        this.blog=res.body
        this.likeColor=this.blog.liked?"color:#05aefc;":"color:black;"
      },
      error:(err)=>console.log(err)
    })
  }

  SendComment(){

    this.blogService.sendComment(this.commentForm.value, this.blog.pk).subscribe({
      next:(res)=>this.handleCommentResponse(res.body),
      error:(err)=>console.log(err)
    })
  }

  handleCommentResponse(data:Comment[] |any){
    this.blog.comments=data==null?0:data.length
    this.commentList=data
    this.display="display:none;"
    this.commentClick()
  }

  getComment(){
    this.blogService.getComment(this.blog.pk).subscribe({
      next:(res)=>this.commentList=res.body,
      error:(err)=>console.log(err)
    })
  }

  commentClick(){
    if(this.display=="display:none;"){
      if(this.blog.comments>0){
        this.getComment()
        this.display="display:flex;"
      }
    }
    else{
      this.display="display:none;"
    }
  }

}
