import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/service/auth-service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  passwordType: string = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  async Entrar() {
    if (this.authForm.valid) {
      const { usuario, password } = this.authForm.value;
      this.authService.login(usuario, password).subscribe(
        async (response) => {
          const user = response.user_info;
          this.authService.setCurrentUser(user);

          if (user.activo) {
            if (user.rol === 'admin') {
              this.router.navigate(['/home-web']);
            } else if (user.rol === 'usuario') {
              this.router.navigate(['/home']);
            }
          } else {
            const toast = await this.toastController.create({
              message: 'El usuario no está activo',
              duration: 2000,
              color: 'danger'
            });
            toast.present();
          }
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Error al iniciar sesión',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    }
  }

  forgotPassword() {
    // Implementa la lógica para la recuperación de contraseña aquí
  }
}
