import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth-service.service';
import { ToastController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registros: any[] = [];
  filteredRegistros: any[] = [];
  searchQuery: string = '';
  registroForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private toastController: ToastController, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadRegistros(); // Cargar registros al cambiar de pantalla
      }
    });
  }

  ngOnInit() {
    this.registroForm = this.fb.group({
      id_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', Validators.required],
      activo: [true, Validators.required]
    });
    this.loadRegistros();
  }

  loadRegistros() {
    this.authService.obtenerRegistros().subscribe(data => {
      this.registros = data.map(registro => ({
        ...registro,
        created_at: new Date(new Date(registro.created_at).getTime() - 0 * 60 * 60 * 1000).toLocaleString('es-MX', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        }) // Formatear fecha y ajustar desfase
      }));
      this.filteredRegistros = this.registros; // Inicializar con todos los registros
    }, error => {
      this.mostrarToast('Error al cargar los registros');
    });
  }

  buscarRegistro() {
    const query = this.searchQuery.toLowerCase();
    this.filteredRegistros = this.registros.filter((registro: any) => {
      return registro.Nombre.toLowerCase().includes(query) ||
             registro.apellido.toLowerCase().includes(query) ||
             registro.created_at.toLowerCase().includes(query) ||
             registro.tipoClave.toLowerCase().includes(query) ||
             registro.tipoAcceso.toLowerCase().includes(query) ||
             registro.id_usuario.toLowerCase().includes(query) ||
             (registro.error && registro.error.toLowerCase().includes(query)); // Incluir error en el filtrado
    });
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  registrarUsuario() {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe(
        async response => {
          this.mostrarToast('Usuario registrado exitosamente');
          this.registroForm.reset(); // Limpiar campos del formulario
        },
        async error => {
          this.mostrarToast('Error al registrar el usuario');
        }
      );
    } else {
      this.mostrarToast('Por favor, complete todos los campos requeridos');
    }
  }
}
