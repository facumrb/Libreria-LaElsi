import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: IniciarSesionComponent },
  { path: 'adminhome', component: AdminComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
