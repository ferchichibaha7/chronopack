import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PackagesComponent } from './pages/admin/packages/packages.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { FournisseurDashboardComponent } from './pages/dashboard/fournisseur-dashboard/fournisseur-dashboard.component';
import { UsersComponent } from './pages/admin/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        children: [
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard
          { path: 'packages', component: PackagesComponent }, // Use your existing component
          // ... other routes specific to the admin area
        ]
      },
      {
        path: 'utilisateurs/:role',
        component:UsersComponent
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      { path: 'baha',component:FournisseurDashboardComponent },

      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      ],
  },

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

   // Wildcard route to redirect undefined routes to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
