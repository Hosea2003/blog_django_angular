import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService:ApiService, private route:Router) { }

  ngOnInit(): void {
  }

  handleLogout(){
    this.apiService.logout().subscribe({
      next:(res)=>{}
    })


    localStorage.removeItem("refresh")
    localStorage.removeItem("access")
    localStorage.removeItem("user")
    this.route.navigateByUrl("/login")
  }

}
