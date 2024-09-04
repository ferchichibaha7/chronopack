import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CoolDialogsModule } from '@angular-cool/dialogs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,TopnavComponent,RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule,PackageListComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
constructor(private router: Router){}
}
