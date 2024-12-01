import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdministradorService } from '../../../services/api-administrador.service';
import { CommonModule } from '@angular/common';
import { IApiAccountInfo } from '../../../models/accountInfo.model';

@Component({
  selector: 'app-view-profile',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css',
})
export class ViewProfileComponent implements OnInit {
  loading: boolean = true;
  admin?: IApiAccountInfo;
  errorMessage: string = '';

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _apiService = inject(ApiAdministradorService);

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const adminId = params['id'];
      this.fetchAdmin(adminId);
    });
  }

  private fetchAdmin(id: number): void {
    this._apiService.getAdmin(id).subscribe({
      next: (data: IApiAccountInfo) => {
        this.admin = data;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        // Manejo de errores según el código de estado.
        if (error.status >= 500) {
          this.errorMessage =
            'Error del servidor. Por favor, intenta más tarde.';
        } else {
          this.errorMessage =
            'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
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
