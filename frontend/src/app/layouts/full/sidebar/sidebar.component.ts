import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems :any;
  userData :any;
  constructor(public navService: NavService,private auth_service:AuthService) {
    this.filterNavByRole()
  }

  ngOnInit(): void {}

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
