import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth-service.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  currentUserId: string;

  constructor(
    private authService: AuthService, 
    private toastController: ToastController, 
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.authService.usuariosInfo().subscribe(data => {
      console.log(data);
      this.users = data.data_user_list.data.map(user => {
        user.activo = !!user.activo; // Establecer el estado según el campo activo
        user.tarjetas = user.tarjetas.map(tarjeta => {
          tarjeta.activo = !!tarjeta.activo; // Establecer el estado según el campo activo
          return tarjeta;
        });
        return user;
      });
      this.filteredUsers = this.users; // Actualizar usuarios filtrados
      console.log(this.users);
    });
  }

  async mostrarToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async mostrarAgregarTarjeta(id_usuario: string) {
    const alert = await this.alertController.create({
      header: 'Agregar Tarjeta',
      inputs: [
        {
          name: 'UID',
          type: 'text',
          placeholder: 'UID de la Tarjeta'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            if (!data.UID) {
              this.mostrarToast('El UID no puede estar en blanco.');
              return false; // Evitar que el popup se cierre
            }
            this.agregarTarjeta(id_usuario, data.UID);
          }
        }
      ]
    });

    await alert.present();
  }

  agregarTarjeta(id_usuario: string, uid: string) {
    const user = this.users.find(u => u.id_usuario === id_usuario);
    if (user) {
      if (!user.tarjetas) {
        user.tarjetas = [];
      }
      if (user.tarjetas.length < 3) {
        const nuevaTarjeta = {
          UID: uid,
          tipo: user.rol === 'admin' ? 'Master' : 'Usuario',
          activo: true // Crear tarjeta como activada por defecto
        };
        user.tarjetas.push(nuevaTarjeta);
        this.authService.registrarUID({id_usuario, UID: uid, tipo: nuevaTarjeta.tipo}).subscribe(response => {
          this.mostrarToast('Tarjeta agregada exitosamente.');
        }, error => {
          this.mostrarToast('Error al agregar la tarjeta');
        });
      } else {
        this.mostrarToast('Solo puedes tener un máximo de 3 tarjetas');
      }
    }
  }

  eliminarTarjeta(id_usuario: string, UID: string): void {
    const user = this.users.find(u => u.id_usuario === id_usuario);
    if (user) {
      const tarjetaIndex = user.tarjetas.findIndex((t: any) => t.UID === UID);
      if (tarjetaIndex > -1) {
        this.authService.borrarTarjeta(UID).subscribe(response => {
          if (response.message === 'Tarjeta borrada exitosamente') {
            user.tarjetas.splice(tarjetaIndex, 1);
            this.mostrarToast('Se eliminó la tarjeta exitosamente');
          } else {
            this.mostrarToast('Error al eliminar la tarjeta');
          }
        }, error => {
          this.mostrarToast('Error al eliminar la tarjeta');
        });
      } else {
        this.mostrarToast('Tarjeta no encontrada');
      }
    } else {
      this.mostrarToast('Usuario no encontrado');
    }
  }

  cambiarEstadoTarjeta(UID: string, id_usuario: string): void {
    const user = this.users.find(u => u.id_usuario === id_usuario);
    if (user && user.activo) {
      this.authService.editarEstado(UID).subscribe(response => {
        this.mostrarToast('Estado de la tarjeta actualizado exitosamente');
        this.loadUsuarios(); // Refrescar la pantalla al cambiar el estado de la tarjeta
      }, error => {
        this.mostrarToast('Error al actualizar el estado de la tarjeta');
      });
    } else {
      this.mostrarToast('No se puede activar la tarjeta si el usuario está desactivado', 'danger');
      this.loadUsuarios(); // Refrescar la pantalla para revertir el cambio
    }
  }

  cambiarEstadoUsuario(id_usuario: string): void {
    const user = this.users.find(u => u.id_usuario === id_usuario);
    if (user) {
      user.activo = !user.activo;
      this.authService.editarEstadoUsuario(id_usuario).subscribe(response => {
        this.mostrarToast('Estado del usuario actualizado exitosamente');
        if (!user.activo) {
          // Desactivar todas las tarjetas del usuario
          user.tarjetas.forEach(tarjeta => {
            tarjeta.activo = false;
            this.authService.editarEstado(tarjeta.UID).subscribe(() => {}, () => {});
          });
        }
        this.loadUsuarios(); // Refrescar la pantalla al cambiar el estado del usuario
      }, error => {
        this.mostrarToast('Error al actualizar el estado del usuario');
      });
    }
  }

  eliminarUsuario(id_usuario: string) {
    if (id_usuario === this.currentUserId) {
      this.mostrarToast('No puedes eliminar tu propia cuenta');
      return;
    }
    this.authService.eliminarUsuario(id_usuario).subscribe(response => {
      if (response.message === 'Usuario eliminado exitosamente') {
        this.users = this.users.filter(user => user.id_usuario !== id_usuario);
        this.filteredUsers = this.users; // Actualizar usuarios filtrados
        this.mostrarToast('Usuario eliminado exitosamente');
      } else {
        this.mostrarToast('Error al eliminar el usuario');
      }
    }, error => {
      this.mostrarToast('Error al eliminar el usuario');
    });
  }

  buscarUsuario() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter((user: any) => {
      return user.nombre.toLowerCase().includes(query) ||
             user.id_usuario.toLowerCase().includes(query) ||
             user.activo.toString().includes(query);
    });
  }
}
