import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-coursier-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule,
    FormsModule,
    NgApexchartsModule,
    TablerIconsModule,],
  templateUrl: './coursier-dashboard.component.html',
  styleUrls: ['./coursier-dashboard.component.scss']
})
export class CoursierDashboardComponent {

}
