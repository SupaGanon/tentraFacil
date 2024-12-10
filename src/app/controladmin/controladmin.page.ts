import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-controladmin',
  templateUrl: './controladmin.page.html',
  styleUrls: ['./controladmin.page.scss'],
})
export class ControladminPage implements OnInit {
  private esp32Ip = 'http://0.0.0.0'; // Cambia esta IP por la del ESP32
  constructor(
    private http: HttpClient,
     private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertController: AlertController // Inyecta el controlador de alertas
  ) {}

  ngOnInit() {
  }
  async Abrir() {
    try {
      // Realiza una solicitud GET o POST al ESP32
      const response = await this.http.get(`${this.esp32Ip}/open-door`).toPromise();
      console.log('Respuesta del ESP32:', response);
      this.showToast('Puerta abierta con éxito', 'success');
    } catch (error) {
      console.error('Error al intentar abrir la puerta:', error);
      this.showToast('Error al abrir la puerta', 'danger');
    }
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
  

  // Función para mostrar un mensaje de alerta
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