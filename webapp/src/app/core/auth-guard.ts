import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  console.log("AuthGuard triggered");
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) { 
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = (route, state) => {
//   // Log the start of the guard execution
//   console.log('=== AuthGuard Triggered ===');
//   console.log('Route:', route);
//   console.log('State:', state);
//   console.log('Current URL:', state.url);

//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Log the authentication state
//   const isAuthenticated = authService.isLoggedIn;
//   console.log('isLoggedIn:', isAuthenticated);

//   if (isAuthenticated) {
//     console.log('User is authenticated, allowing access to:', state.url);
//     return true;
//   } else {
//     console.log('User not authenticated, redirecting to /login');
//     console.log('Redirect URL with returnUrl:', `/login?returnUrl=${encodeURIComponent(state.url)}`);
//     router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// };