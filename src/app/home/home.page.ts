import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  id_usuario: string;
  rol: any;
  tokenUser: any;
  nombre: string;
  apellido: string;
  photoUrl: string = '';
  httpa: any;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (!this.authService.isAuthenticated() || !user.activo || user.rol !== 'usuario' ) {
      this.router.navigate(['/login']);
    } else {
      this.id_usuario = user.id_usuario;
      this.nombre = user.nombre;
      this.apellido = user.apellido;
      this.photoUrl = user.photoUrl;
    }

    console.log(this.id_usuario);
  }

  config() {
    this.navCtrl.navigateForward('/config');
  }

  perfil() {
    this.navCtrl.navigateForward('/profile');
  }

  pin() {
    this.navCtrl.navigateForward('/pin');
  }

  async logout() {
    this.authService.logout().subscribe(
      async response => {
        const toast = await this.toastCtrl.create({
          message: 'Cierre de sesión exitoso',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/login']); // Redirigir al login
      },
      async error => {
        const toast = await this.toastCtrl.create({
          message: 'Error al cerrar la sesión',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }

  async Abrir() { 
    this.authService.activarRele().subscribe( 
      response => { 
        console.log('Respuesta del servidor ESP32:', response); 
        this.showToast('Acceso confirmado, adelante.', 'success'); 
      }, 
      error => { console.error('Error al enviar la solicitud al servidor ESP32:', error); 
        this.showToast('Acceso confirmado, adelante.', 'success'); 
      }
    );
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async showPanicAlert() {
    const alert = await this.alertController.create({
      header: '¡Alerta de Pánico!',
      message: '¡Has activado el botón de pánico! ¿Estás seguro de que quieres continuar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Pánico confirmado');
          }
        }
      ],
      cssClass: 'alert-panic', // Estilo personalizado para la alerta
    });
    await alert.present();
  }
}
