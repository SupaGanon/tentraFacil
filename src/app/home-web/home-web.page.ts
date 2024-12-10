import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.page.html',
  styleUrls: ['./home-web.page.scss'],
})
export class HomeWebPage implements OnInit {
  nombre: string;
  apellido: string;
  status: string;
  rol: string;
  id_usuario: string;
  photoUrl: string;
  tokenUser: string;
  selectedTab: string = 'registro';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    
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

  private async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000,
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
