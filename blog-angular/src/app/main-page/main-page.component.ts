import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router, UrlSerializer } from '@angular/router';
import { User } from '../Model/Model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  refresh:string | undefined=undefined
  timer:any
  checkTokenTimer:any
  constructor(private apiService:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.checkIfTokenExist()
    var fourmin:number=1000*60
    this.timer=setInterval(()=>this.refreshToken(), fourmin)
    this.checkTokenTimer=setInterval(()=>this.checkIfTokenExist(), 100)
  }

  refreshToken(){
    this.refresh=localStorage.getItem("refresh")?.toString()
    if(this.refresh ==undefined){
      //go to login
      this.goToLogin()
      return
    }
    console.log("refreshed")

    this.apiService.refresh(this.refresh).subscribe({
      next:(res)=>this.setToken(res.body),
      error:(err)=>this.handleLogout() //handle error
    })
  }

  setToken(data:any){
    localStorage.setItem("refresh", data.refresh)
    localStorage.setItem("access", data.access)
    console.log(data)

    this.apiService.ConectedUser().subscribe({
      next:(res)=>{
        localStorage.setItem("user", JSON.stringify(res.body))
      }
    })
  }

  checkIfTokenExist(){
    this.refresh=localStorage.getItem("refresh")?.toString()
    if(this.refresh==undefined){
      this.goToLogin()
    }
  }

  handleLogout(){
    localStorage.removeItem("refresh")
    localStorage.removeItem("access")
    this.goToLogin()
  }

  goToLogin(){
    clearInterval(this.timer)
    this.router.navigateByUrl("/login")
  }

}
