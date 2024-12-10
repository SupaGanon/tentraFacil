import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth-service.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearperfil',
  templateUrl: './crearperfil.page.html',
  styleUrls: ['./crearperfil.page.scss'],
})
export class CrearperfilPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  id_usuario: string = '';
  email: string = '';
  rol: string = '';
  password: string = '';
  confirmarPassword: string = '';

  passwordType: string = 'password';
  confirmarPasswordType: string = 'password';

  idUsuarioPattern: string = '^[a-zA-Z0-9]{6,}$'; // Sin espacios, solo letras y números, longitud mínima de 6

  constructor(
    private authService: AuthService, 
    private toastController: ToastController, 
    private router: Router
  ) { }

  ngOnInit() {
  }

  validarIDUsuario() {
    if (this.id_usuario.length < 6 || /\s/.test(this.id_usuario)) {
      this.mostrarToast('El ID de usuario debe tener al menos 6 caracteres sin espacios.', 'danger');
      return false;
    }
    return true;
  }

  validarCampos(): boolean {
    if (!this.nombre || !this.apellido || !this.id_usuario || !this.email || !this.rol || !this.password || !this.confirmarPassword) {
      this.mostrarToast('Todos los campos son obligatorios.', 'danger');
      return false;
    }
    if (!this.validarIDUsuario()) {
      return false;
    }
    if (this.password.length < 8) {
      this.mostrarToast('La contraseña debe tener al menos 8 caracteres.', 'danger');
      return false;
    }
    if (this.password !== this.confirmarPassword) {
      this.mostrarToast('Las contraseñas no coinciden.', 'danger');
      return false;
    }
    return true;
  }

  registrarUsuario() {
    if (!this.validarCampos()) {
      return;
    }

    const data = {
      id_usuario: this.id_usuario,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.authService.register(data).subscribe(
      response => {
        this.mostrarToast('Usuario registrado exitosamente.', 'success');
        this.limpiarCampos(); // Limpiar campos del formulario
      },
      error => {
        this.mostrarToast('Error al registrar el usuario.', 'danger');
      }
    );
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.id_usuario = '';
    this.email = '';
    this.rol = '';
    this.password = '';
    this.confirmarPassword = '';
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  toggleConfirmarPasswordVisibility() {
    this.confirmarPasswordType = this.confirmarPasswordType === 'text' ? 'password' : 'text';
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
