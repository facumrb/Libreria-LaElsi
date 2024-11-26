import { Routes } from '@angular/router';
import { LoginHomeComponent } from './pages/login-home/login-home.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { adminGuard } from './services/admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  {
    path: 'admin',
    children: [
      { path: 'home', component: HomeComponent, canActivate: [adminGuard] },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
