import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  icon="visibility"
  type="password"

  loginForm=new FormGroup({
    username:new FormControl("", {nonNullable:true}),
    password:new FormControl("", {nonNullable:true})
  })
  constructor(private apiService:ApiService,private router:Router) { 
    this.IsConnected()
  }

  ngOnInit(): void {
  }

  changeIcon(){
    this.icon=this.icon=="visibility"?"visibility_off":"visibility"
    this.type=this.type=="password"?"text":"password"
  }
  
  getData(){
    var username:string=this.loginForm.value.username ? this.loginForm.value.username:""
    var password:string=this.loginForm.value.password ? this.loginForm.value.password:""
    this.apiService.login({username:username, password:password}).subscribe({
      next:(res)=>this.loginSuccess(res),
      error:(err)=>console.log(err)
    })
  }

  loginFailed(){
    console.log("failed to log in")
  }

  loginSuccess(data:any){
    localStorage.setItem("refresh", data.refresh)
    localStorage.setItem("access", data.access)

    this.apiService.ConectedUser().subscribe({
      next:(res)=>{
        localStorage.setItem("user", JSON.stringify(res.body))
      }
    })

    this.router.navigateByUrl("/")
  }

  IsConnected():any{
      var token:string|undefined = localStorage.getItem("refresh")?.toString()
      if(token ==undefined)return false

      var connected:boolean=false
      var result = this.apiService.verify(token).subscribe({
        next:(res)=>{
          var result:any= res.body
          var field=result.non_field_errors
          if(field==undefined)connected=true
          else connected=false
        },
        complete:()=>{
          if(connected){
            this.router.navigate(["/"])
          }
        }
      })
  }

}
