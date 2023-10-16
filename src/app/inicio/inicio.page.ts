import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  username: string = '';
  isLoggedIn: boolean = false;
  feriadosData: any;


  constructor(private router: Router,  private apiService: ApiService) {}

  openPage(page: string) {
    if (page === 'crear') {
      this.router.navigate(['/crear']);
    } else if (page === 'about') {
      this.router.navigate(['/about']);
    } else if (page === 'registro') {
      this.router.navigate(['/registro']);
    } else if (page === 'asignaturas') {
      this.router.navigateByUrl('/asignaturas');
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.isLoggedIn = false;
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
