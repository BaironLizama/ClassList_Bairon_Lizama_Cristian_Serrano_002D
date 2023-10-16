import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  asignaturas: Array<Asignatura> = [];
  nuevaAsignatura = { nombre: '', descripcion: '' };
  asignaturaParaEditar: Asignatura | null = null; // Variable para asignatura en edición
  error: string = '';

  constructor(private alertController: AlertController) {}

  agregarAsignatura() {
    if (this.nuevaAsignatura.nombre.trim() !== '' && this.nuevaAsignatura.descripcion.trim() !== '') {
      const nuevaAsignatura: Asignatura = {
        id: this.asignaturas.length + 1, // Asignar un identificador único basado en la longitud del arreglo
        nombre: this.nuevaAsignatura.nombre,
        descripcion: this.nuevaAsignatura.descripcion,
      };
      this.asignaturas.push(nuevaAsignatura);
      this.nuevaAsignatura = { nombre: '', descripcion: '' };
      this.error = '';

      // Guardar en localStorage
      this.guardarEnLocalStorage();
    } else {
      this.mostrarAlerta('Error', 'Rellene los campos');
    }
  }

  // Función para iniciar la edición de una asignatura
  editarAsignatura(asignatura: Asignatura) {
    this.asignaturaParaEditar = asignatura;
  }

  // Función para guardar los cambios en la asignatura
  guardarCambiosAsignatura() {
    if (this.asignaturaParaEditar) {
      const index = this.asignaturas.findIndex(
        (asignatura) => asignatura.id === this.asignaturaParaEditar?.id
      );
      if (index !== -1) {
        this.asignaturas[index] = this.asignaturaParaEditar;
        this.asignaturaParaEditar = null;
      }
    }
  }

  guardarEnLocalStorage() {
    localStorage.setItem('asignaturas', JSON.stringify(this.asignaturas));
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  borrarAsignatura(asignatura: Asignatura) {
    const index = this.asignaturas.findIndex(a => a.id === asignatura.id);
    if (index !== -1) {
      this.asignaturas.splice(index, 1); 
      this.guardarEnLocalStorage(); 
    }
  }
  

  ngOnInit() {
    const asignaturasGuardadas = localStorage.getItem('asignaturas');
    if (asignaturasGuardadas) {
      this.asignaturas = JSON.parse(asignaturasGuardadas);
    }
  }
}

interface Asignatura {
  id: number;
  nombre: string;
  descripcion: string;
}
