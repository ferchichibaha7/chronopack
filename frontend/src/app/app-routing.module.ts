import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { FournisseurDashboardComponent } from './pages/dashboard/fournisseur-dashboard/fournisseur-dashboard.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { MyPackagesComponent } from './pages/Fournisseur/my-packages/my-packages.component';
import { PdfGeneratorComponent } from './pages/Shared/pdf-generator/pdf-generator.component';
import { RoleGuard } from './auth/guards/role.guard';
import { StockComponent } from './pages/Manager/stock/stock.component';
import { EnAttenteComponent } from './pages/Manager/en-attente/en-attente.component';
import { PickupComponent } from './pages/Manager/pickup/pickup.component';

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

          // ... other routes specific to the admin area
        ],
      },
      {
        path: 'utilisateurs/:role',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Administrateur'], // Specify the expected roles for this route
        },
        component: UsersComponent,
      },
      {
        path: 'packages',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Fournisseur', 'Administrateur'], // Specify the expected roles for this route
        },
        component: MyPackagesComponent,
      },

      {
        path: 'allpackages',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Manager', 'Magasinier'], // Specify the expected roles for this route
        },
        component: StockComponent,
      },
      {
        path: 'en-attente',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Manager', 'Magasinier'], // Specify the expected roles for this route
        },
        component: EnAttenteComponent,
      },
      {
        path: 'pickup',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Manager', 'Magasinier'], // Specify the expected roles for this route
        },
        component: PickupComponent,
      },
      { path: '**', redirectTo: '/dashboard' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['Administrateur'], // Specify the expected roles for this route
        },
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      { path: 'baha', component: FournisseurDashboardComponent },

      {
        path: 'extra',


        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
       // Wildcard route to redirect undefined routes to home
  { path: '**', redirectTo: '/dashboard' },
    ],
  },
  { path: 'bordereau/:id', component: PdfGeneratorComponent },

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
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
