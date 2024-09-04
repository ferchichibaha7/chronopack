import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoolDialogsModule } from '@angular-cool/dialogs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [CommonModule,RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule,PackageListComponent],
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent {
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
