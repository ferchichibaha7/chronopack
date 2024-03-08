import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { MagasinierDashboardComponent } from './dashboard/magasinier-dashboard/magasinier-dashboard.component';
import { CoursierDashboardComponent } from './dashboard/coursier-dashboard/coursier-dashboard.component';
import { FournisseurDashboardComponent } from './dashboard/fournisseur-dashboard/fournisseur-dashboard.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CoolDialogsModule } from '@angular-cool/dialogs';
import { PdfGeneratorComponent } from './Shared/pdf-generator/pdf-generator.component';

@NgModule({
  declarations: [AppDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    MagasinierDashboardComponent,
    CoursierDashboardComponent,
    FournisseurDashboardComponent,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    CoolDialogsModule.forRoot()
  ],
  exports: [TablerIconsModule,ConfirmationPopoverModule,CoolDialogsModule],
})
export class PagesModule {}
