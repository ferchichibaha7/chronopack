import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-magasinier-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule,
    FormsModule,
    NgApexchartsModule,
    TablerIconsModule,],
  templateUrl: './magasinier-dashboard.component.html',
  styleUrls: ['./magasinier-dashboard.component.scss']
})
export class MagasinierDashboardComponent {

}
