import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  selectedRole: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  register() {
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.presentAlert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }
    if (!this.isUsernameValid(this.username)) {
      this.presentAlert('El nombre de usuario no es válido', 'El nombre de usuario debe tener entre 8 y 15 caracteres.');
      return;
    }
    if (!this.isEmailValid(this.email)) {
      this.presentAlert('El correo no es válido', 'El formato del correo electrónico no es válido.');
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      this.presentAlert('La contraseña no es válida', 'La contraseña debe tener entre 8 y 12 caracteres y contener al menos un carácter especial.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Contraseñas no coinciden', 'Las contraseñas deben coincidir.');
      return;
    }
    if (!this.selectedRole) {
      this.presentAlert('Rol no seleccionado', 'Por favor, seleccione un rol.');
      return;
    }
  
    this.router.navigate(['/login']);
    const userData = {
      username: this.username,
      password: this.password,
      role: this.selectedRole,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/login']);
  }

  isUsernameValid(username: string): boolean {
    return username.length >= 8 && username.length <= 15;
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  isPasswordValid(password: string): boolean {
    const specialCharacters = /[$&+,:;=?@#|'<>.^*()%!-]/;
    return password.length >= 8 && password.length <= 12 && specialCharacters.test(password);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
