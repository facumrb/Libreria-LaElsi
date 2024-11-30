import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IApiAdmin } from '../../../models/admin.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  loading: boolean = true;
  admin?: IApiAdmin;

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const adminId = params['id'];
      this.fetchAdmin(adminId);
    });
  }

  private fetchAdmin(id: string): void {
    this._apiService.getAdminById(id).subscribe({
      next: (data: IApiAdmin) => {
        console.log('Administrador cargado:', data);
        this.admin = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar el administrador:', err);
        this.loading = false;
      },
    });
  }

  volverAtras(): void {
    this._router.navigate(['/admin/home']);
  }

  editarPerfil(): void {
    this._router.navigate(['/admin/edit-profile', this.admin?.id]);
  }
}
