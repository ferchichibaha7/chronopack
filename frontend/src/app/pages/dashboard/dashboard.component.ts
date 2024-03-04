import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit  {
  userData :any
  constructor( private auth_service : AuthService){}
  ngOnInit() {
    this.auth_service.getUserData().subscribe(userData => {
      this.userData = userData;
    });
  }

}
