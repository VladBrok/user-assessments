import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (auth.isLoggedIn() && route.routeConfig?.path === 'login') {
    router.navigate(['/dashboard']);
    return false;
  }

  if (
    (!auth.isLoggedIn() ||
      (route.routeConfig?.path === 'admin' && !auth.isAdmin())) &&
    route.routeConfig?.path !== 'login'
  ) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
