import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const PermissionGuard: CanActivateFn = (route, state) => {
  const actionIdentifier = route.data['permission'];
  
  if (AuthService.checkPermission(actionIdentifier)) {
    return true; // User has permission, allow access to the route
  }

  // TODO
  // User does not have permission, redirect to a denied page or handle as needed
  // You can navigate to a permission denied page or return false based on your requirements.
  // Example: state.url will have the current route URL.
  console.log(`Permission denied for ${actionIdentifier}.`);
  return false;
};
