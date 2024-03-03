import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  userData :any
  constructor( private auth_service : AuthService){}
  ngOnInit() {
    this.auth_service.getUserData().subscribe(userData => {
      this.userData = userData;
      // You can perform any additional actions here when user data changes
    });
  }

}
