import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminDataService } from './admin-data-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _adminDataService = inject(AdminDataService);
  const _router = inject(Router);

  if (_adminDataService.getAdminId() !== undefined) {
    return true;
  }
  _router.navigate(['/login']);
  return false;
};
