import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.page.html',
  styleUrls: ['./inicio2.page.scss'],
})
export class Inicio2Page implements OnInit {

  username: string = '';
  feriadosData: any;
  

  constructor(private router: Router, private apiService: ApiService ) { }

  openPage(page: string) {
    if (page === 'scan') {
      this.router.navigate(['/scan']);
    } else if (page === 'about') {
      this.router.navigate(['/about']);
    } else if (page === 'registro') {
      this.router.navigate(['/registro']);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      this.username = userData.username;
    }
    const callback = 'myCallbackFunction'; 
    this.apiService.getFeriados(callback).subscribe(data => {
      this.feriadosData = data;
    });
  }

}
