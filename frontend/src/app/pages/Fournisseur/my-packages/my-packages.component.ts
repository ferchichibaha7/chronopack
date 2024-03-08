import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { PackageService } from './my-packages.service';
import { MatTableDataSource } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CoolDialogService, CoolDialogsModule } from '@angular-cool/dialogs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';
@Component({
  selector: 'app-my-packages',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule,PackageListComponent],
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {
  showCreate: boolean = false;
  selectedPackageId: number;
  packageForm: FormGroup;

  constructor(private fb: FormBuilder,  private packageService:PackageService) { }
  @ViewChild(PackageListComponent ) packageList: PackageListComponent ;
  ngOnInit(): void {

    this.packageForm = this.fb.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      receiver_name: ['', Validators.required],
      receiver_address: ['', Validators.required],
      receiver_contact_info: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.packageForm.valid) {
      const packageData = this.packageForm.value;
      this.packageService.createPackage(packageData).subscribe(
        (response) => {
          //this.getPackages()
          this.packageList.getPackages()
          // You may perform any additional actions upon successful package creation
          this.showCreate = false
          this.clearForm(); // Clear the form after successful submission
        },
        (error) => {
          console.error('Error creating package:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
    } else {
      // Handle case where form is not valid, e.g., display an error message to the user
    }
  }



  clearForm() {
    this.packageForm.reset();
  }
}
