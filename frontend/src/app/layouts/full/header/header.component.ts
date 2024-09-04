import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  userData: any;

  constructor(private router: Router,public dialog: MatDialog,private auth_service:AuthService) {}
  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.auth_service.fetchUserData().subscribe(userData => {
      this.auth_service.setUserData(userData.result);
      this.userData =userData.result
    });

  }

  logout(){
      this.auth_service.signOut().subscribe(()=>{
        this.router.navigate(['/authentication']);
      })
  }

}
