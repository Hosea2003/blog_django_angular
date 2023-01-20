import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, BlogCreateService } from '../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url="http://localhost:8000/blog-api/"
  constructor(private http:HttpClient) { }

  token():string{
    var token=localStorage.getItem("access")?.toString()
    if(token==undefined)token=""
    return token
  }

  getBlogs():Observable<HttpResponse<Blog>>{
    
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    return this.http.get<Blog>(this.url, {observe:'response', headers:headers})
  }

  likeBlog(pk:number):Observable<HttpResponse<Blog>>{
    var url=`${this.url}like/${pk.toString()}/`
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })

    return this.http.post<Blog>(url, {}, {observe:"response", headers:headers})
  }

  createBlog(blog:BlogCreateService):Observable<HttpResponse<Blog>>{
    var url=`${this.url}create/`
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    const data= new FormData()
    data.append("title", blog.title)
    data.append("content", blog.content)
    if(blog.image!=null)
      data.append("image", blog.image, blog.image.name)
    else data.append("image", blog.image)
    console.log(data.get("title"))
    console.log(data.get("image"))
    return this.http.post<Blog>(url, blog, {observe:"response", headers:headers})
  }

  sendComment(data:{comment:string}|any, pk:number):Observable<HttpResponse<Comment>>{
    var url = `${this.url}comments/${pk}`
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    return this.http.post<Comment>(url, data, {observe:"response", headers:headers})
  }

  getComment(pk:number):Observable<HttpResponse<any>>{
    var url=`${this.url}comments/${pk}`
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    return this.http.get<any>(url, {observe:"response", headers:headers})
  }

  
}
