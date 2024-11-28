import { Routes } from '@angular/router';
import { LoginHomeComponent } from './pages/login-home/login-home.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { adminGuard } from './services/admin.guard';
import { EditProfileComponent } from './pages/admin/edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  {
    path: 'admin',
    children: [
      { path: 'home', component: HomeComponent /* canActivate: [adminGuard]*/ },
      { path: 'edit-profile', component: EditProfileComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
