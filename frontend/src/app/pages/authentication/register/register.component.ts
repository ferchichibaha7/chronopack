import { CoolDialogsModule } from '@angular-cool/dialogs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../admin/users/user.service';
import { DepotService } from 'src/app/services/depot.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule,TopnavComponent,RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule,PackageListComponent],

})
export class AppSideRegisterComponent {
  userForm: FormGroup;
  depots : any = []
  currentuser:any
  showCreate= false
  users_loading = false
  role = '';
  testd : any
  error = false
  loading = false
  error_message = 'error'
  constructor( private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private DepotService : DepotService,
    private authservice : AuthService)  {
      this.userForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        depotId: ['']
      });
    }

  ngOnInit() {
    this.loadDepots()

  }
  loadDepots(): void {

    this.DepotService.getAllDepots().subscribe(
      (depots: any) => {
        this.depots = depots

      },
      (error: any) => {
        console.error('Error fetching depots:', error);
      }
    );
  }
  onSubmit(): void {
    this.error = false
    this.loading = true
    if (this.userForm.valid) {
      // Call your service to sign in the user
      this.userService.register(this.userForm.value).subscribe(
        (response: any) => {
          // Navigate to desired route or perform other actions

          this.router.navigate(['/authentication/login']);

        },
        (error: any) => {

          if(error.error.errors[0].msg){
            this.error_message = error.error.errors[0].msg
            this.error = true
            this.loading = false
          }



        }
      );
    }
  }
}
