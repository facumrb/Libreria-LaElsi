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

@Component({
  selector: 'app-login-home',
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-home.component.html',
  styleUrl: './login-home.component.css',
})
export class LoginHomeComponent {
  formLoginAdmin!: FormGroup;
  private _apiService = inject(ApiService);
  private _router = inject(Router);
  loading: boolean = false;
  passwordVisible: boolean = false;
  showEyeIcon: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formLoginAdmin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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
      setTimeout(() => {
        console.log(this.formLoginAdmin.value);
        this.loading = false;
        this._router.navigate(['/admin/home']);
      }, 700); // Simula un tiempo de espera
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
