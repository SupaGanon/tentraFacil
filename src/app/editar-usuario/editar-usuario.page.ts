import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  users:any[] = [];
  tarjeta:any[] = [];
  usuarios:any[] = [];
  inputVisible: string | null = null;
  nombre:string;
  id:string;
  usuarioTarjeta:string;
  apelido:string;
  idTarjeta:string;
  id_usuario:string;

  constructor( private authService: AuthService,  private cookieService: CookieService ) { }

  ngOnInit() {

    this.id_usuario = this.cookieService.get('id_usuario');

    this.authService.user(this.id_usuario).subscribe(data =>{
      console.log(data);
      this.users = data.data_user_list.data;
      console.log(this.users);
    });
  }

  agregarTarjeta(userId: string, nuevaTarjeta: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      if (user.tarjeta.length < 3) {
        user.tarjeta.push(nuevaTarjeta); // Si el usuario tiene menos de 3 tarjetas, se agrega la nueva tarjeta
        alert('Se agrego exitosamente.')
      } else {
        alert('Solo puedes tener un máximo de 3 tarjetas');
      }
    }
  }
  // Función para eliminar la tarjeta
  eliminarTarjeta(userId: any, index: number): void {
    // Encontrar el usuario por su id
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      // Eliminar la tarjeta del array de tarjetas
      user.tarjeta.splice(index, 1);
      alert('Se elimino la tarjeta exitosamente')
    }
    else{
      alert('No se pudo eliminar la tarjeta')
    }
    
  }
  // Función para eliminar un usuario por su id
  EliminarUsuario(userId: string) {
    this.users = this.users.filter(user => user.id !== userId);
    alert('Usuario eliminado exitosamente')
  }

}