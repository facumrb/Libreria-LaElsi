import { CommonModule, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-home',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.css',
})
export class LoginHomeComponent {
  formLoginAdmin!: FormGroup;
  private _apiService = inject(ApiService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  loading: boolean = false;
  passwordVisible: boolean = false;
  showEyeIcon: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formLoginAdmin = this.formBuilder.group({
      usuario: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')],
      ],
      password: ['', [Validators.required]],
    });
  }

  enviar(event: Event): boolean {
    event.preventDefault();

    if (this.formLoginAdmin.invalid) {
      this.formLoginAdmin.markAllAsTouched();
      return false;
    } else {
      this.loading = true;

      const { usuario, password } = this.formLoginAdmin.value;

      // Usar el servicio de autenticación para hacer login
      this._authService.login(usuario, password).subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
          // Redirigir al home del administrador si el login es exitoso
          this._router.navigate(['/admin/home']);
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          // Mostrar mensaje de error si las credenciales son incorrectas
          alert(error.error.message || 'Error en el inicio de sesión');
        },
      });

      return true;
    }
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.formLoginAdmin.get(field)?.hasError(typeError) &&
      this.formLoginAdmin.get(field)?.touched
    );
  }

  //MOSTRAR O NO EL ICONO DEL OJO
  onPasswordInput(): void {
    const passwordValue = this.formLoginAdmin.get('password')?.value || '';
    this.showEyeIcon = passwordValue.length > 0;
  }

  //MOSTRAR CONTRASEÑA
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible; // Alterna la visibilidad
  }
}
