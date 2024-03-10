import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, firstValueFrom, take } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  currentUserRole :any
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const expectedRoles = next.data['expectedRoles'];

    try {
      const userRole = await this.getUserRole(); // Get the role before checking

      if (!userRole || !expectedRoles.includes(userRole)) {
        this.router.navigate(['/']); // Redirect if unauthorized
        return false;
      }
      return true; // Authorized
    } catch (error) {
      console.error('Error retrieving user role:', error);
      // Handle any errors gracefully, e.g., redirect to an error page
      return false; // Prevent access in case of errors
    }
  }

  async getUserRole(): Promise<string | null> {
    try {
      const userData = await firstValueFrom(this.authService.getUserData()); // Await the first non-null value
      return userData ? userData.role.role_name : null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Re-throw the error for handling in canActivate
    }
  }

}
