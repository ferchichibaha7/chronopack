import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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
