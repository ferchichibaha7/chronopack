import { CoolDialogsModule } from '@angular-cool/dialogs';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { MaterialModule } from 'src/app/material.module';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule,TopnavComponent,RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule,PackageListComponent],
})
export class AppSideLoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = false
  loading = false
  error_message = 'error'
  constructor(private router: Router,private auth_service : AuthService,private formBuilder: FormBuilder,) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.error = false
    this.loading = true
    if (this.loginForm.valid) {
      // Call your service to sign in the user
      this.auth_service.signIn(this.loginForm.value).subscribe(
        (response: any) => {
          // Navigate to desired route or perform other actions

          this.router.navigate(['/']);

        },
        (error: any) => {
          if(error.error.errors[0].msg =='Invalid Credentials'){
            this.error_message = error.error.errors[0].msg
            this.error = true
            this.loading = false
          }
          else if(error.error.errors[0].msg =='Account disabled'){
            this.error_message = error.error.errors[0].msg
            this.error = true
            this.loading = false
          }

        }
      );
    }
  }
}
