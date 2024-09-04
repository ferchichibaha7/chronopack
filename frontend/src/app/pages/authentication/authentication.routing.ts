import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { NoAuthGuard } from 'src/app/auth/guards/noAuth.guard';
import { LandingComponent } from './landing/landing.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
    ],
  },
];
