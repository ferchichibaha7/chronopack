import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { NoAuthGuard } from 'src/app/auth/guards/noAuth.guard';

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
        path: 'register',
        component: AppSideRegisterComponent,
      },
    ],
  },
];
