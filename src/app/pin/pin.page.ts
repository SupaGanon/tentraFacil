import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {
  number = 1234; // Tu número de 4 dígitos
  digits: number[] = [];
  timer: number = 30; // Temporizador de 30 segundos
  timerInterval: any; // Variable para almacenar el intervalo
  canGenerateCode: boolean = true; // Controla si se puede generar un nuevo código

  constructor(
    private ToastCtrl: ToastController,
    private alertController: AlertController // Inyecta el controlador de alertas
  ) {
    // Divide el número en dígitos
    this.digits = this.number.toString().split('').map(Number);
  }

  ngOnInit() {}

  // Función para generar un nuevo código de 4 dígitos
  generateNewCode() {
    if (!this.canGenerateCode) {
      this.showAlert('Espera a que termine el temporizador antes de generar un nuevo código.');
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000); // Genera un número de 4 dígitos
    this.digits = Array.from(String(code), Number); // Convierte el número en un array de dígitos

    // Iniciar el temporizador
    this.startTimer();
  }

  // Función para iniciar el temporizador
  startTimer() {
    this.timer = 30; // Restablece el temporizador a 30 segundos
    this.canGenerateCode = false; // Deshabilita el botón de generar código

    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canGenerateCode = true; // Habilita el botón cuando termine el temporizador
        clearInterval(this.timerInterval); // Detiene el intervalo
      }
    }, 1000);
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