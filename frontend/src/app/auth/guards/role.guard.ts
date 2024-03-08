import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  currentUserRole :any
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const expectedRoles = next.data['expectedRoles'];
    await this.getuser()

    if (!this.currentUserRole || !expectedRoles.includes(this.currentUserRole)) {
      // Redirect the user to the home page or any other route
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  getuser(){
    this.authService.userData$.subscribe(data=>{
      this.currentUserRole = data.role.role_name
    }); // Assuming you have a method to get the user's role
  }
}
