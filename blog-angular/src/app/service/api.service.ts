import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { from, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../Model/Model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  token():string{
    var token=localStorage.getItem("access")?.toString()
    if(token==undefined)token=""
    return token
  }

  refreshToken():string{
    var token=localStorage.getItem("refresh")?.toString()
    if(token==undefined)token=""
    return token
  }

  login(data:{username:string, password:string}){
    var url="http://localhost:8000/api/token/"
    return this.http.post<{refresh:string, access:string}>(url, data)
  }

  refresh(refreshToken:string):Observable<HttpResponse<{refresh:string}>>{
    var url="http://localhost:8000/api/token/refresh/"
    return this.http.post<{refresh:string}>(
      url, {refresh:refreshToken},{ observe: 'response' });
  }

  ConectedUser():Observable<HttpResponse<User>>{
    var url = "http://localhost:8000/api/connected_user"
    var user:User|any=null
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    return this.http.get<User>(url, {headers:headers, observe:"response"})
  }

  logout(){
    var url="http://localhost:8000/api/logout/"
    const headers=new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+this.token()
    })
    return this.http.post(url, {refresh_token:this.refreshToken()}, {headers:headers})
  }

  verify(token:string){
    var url="http://localhost:8000/api/token/verify/"
    return this.http.post(url, {token:token}, {observe:"response"})
  }
}
