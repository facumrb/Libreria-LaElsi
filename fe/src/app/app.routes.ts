import { Routes } from '@angular/router';
import { LoginHomeComponent } from './pages/login-home/login-home.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { adminGuard } from './services/admin.guard';
import { EditProfileComponent } from './pages/admin/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './pages/admin/view-profile/view-profile.component';
import { CategoriasComponent } from './pages/admin/categorias/categorias.component';
import { ItemsComponent } from './pages/admin/items/items.component';

export const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'view-profile/:id', component: ViewProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'items', component: ItemsComponent },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
