import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems :any;
  userData :any;
  constructor(private router: Router,public navService: NavService,private auth_service:AuthService,) {
    this.filterNavByRole()
  }

  ngOnInit(): void {
    this.getUserData()
  }


  getUserData(){
    this.auth_service.fetchUserData().subscribe(userData => {
      this.auth_service.setUserData(userData.result);
      this.userData =userData.result


    });

  }

  getNavCap(roleName: string): string {
    switch (roleName) {
      case 'Administrateur':
        return 'Administrateur';
      case 'Fournisseur':
        return 'Fournisseur';
      case 'Magasinier':
        return 'Magasinier';
      case 'Coursier':
        return 'Livreur';
      case 'Manager':
        return 'Chef de dépôt';
      default:
        return '';
    }
  }

  logout(){
      this.auth_service.signOut().subscribe(()=>{
        this.router.navigate(['/authentication/login']);
      })
  }
  filterNavByRole(){
    this.auth_service.fetchUserData().subscribe(userData => {
      this.auth_service.setUserData(userData.result);
      this.userData =userData.result
      if(navItems && navItems.length>0){
        this.navItems = navItems.filter(item =>{
          if(item.roles){
            return item.roles?.includes(this.userData.role.role_name)
          }
          return item
        })
      }

    });

  }
}
