import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-fournisseur-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule,
    FormsModule,
    NgApexchartsModule,
    TablerIconsModule,],
  templateUrl: './fournisseur-dashboard.component.html',
  styleUrls: ['./fournisseur-dashboard.component.scss']
})
export class FournisseurDashboardComponent {

}
