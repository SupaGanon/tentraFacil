import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeWebPage } from './home-web.page';
import { AuthGuard } from '../guards/auth.guard'; // Importa el guard de autenticación

const routes: Routes = [
  {
    path: 'home-web',
    component: HomeWebPage,
    canActivate: [AuthGuard], // Aplica el guard de autenticación aquí
    children: [
      {
        path: 'registro',
        loadChildren: () => import('../registro/registro.module').then(m => m.RegistroPageModule)
      },
      {
        path: 'controladmin',
        loadChildren: () => import('../controladmin/controladmin.module').then(m => m.ControladminPageModule)
      },
      {
        path: 'crearperfil',
        loadChildren: () => import('../crearperfil/crearperfil.module').then(m => m.CrearperfilPageModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosPageModule)
      },
      {
        path: '',
        redirectTo: 'home-web/registro',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home-web/registro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWebPageRoutingModule {}
