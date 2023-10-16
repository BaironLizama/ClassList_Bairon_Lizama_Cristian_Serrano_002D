import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  login() {

    const userDataStr = localStorage.getItem('userData');

    if (userDataStr) {
      const userData = JSON.parse(userDataStr);

      if (userData.username === this.username && userData.password === this.password) {
        if (userData.role === 'profesor') {
          this.router.navigate(['/inicio']);
        } else if (userData.role === 'alumno') {
          this.router.navigate(['/inicio2']);
        }
      } else {
        this.presentAlert('Credenciales incorrectas', 'Por favor, verifica tus datos.');
        this.username = '';
        this.password = '';
      }
    } else {
      this.presentAlert('Usuario no encontrado', 'No se encontraron datos de usuario.');
      this.username = '';
      this.password = '';
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
