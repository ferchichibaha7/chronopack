import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { PackageService } from './my-packages.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-packages',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {
  showCreate: boolean = false;
  packageForm: FormGroup;
  packages: any[] = [];
  packages_loading = false
  dataSource = new MatTableDataSource<any>(); // Use 'any' type here
  displayedColumns: string[] = ['package_id', 'description', 'weight', 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info', 'status_statusName'];
  constructor(private fb: FormBuilder, private http: HttpClient, private packageService:PackageService) { }

  ngOnInit(): void {
    this.getPackages()
    this.packageForm = this.fb.group({
      description: ['', Validators.required],
      weight: ['', Validators.required],
      price: ['', Validators.required],
      receiver_name: ['', Validators.required],
      receiver_address: ['', Validators.required],
      receiver_contact_info: ['', Validators.required]
    });
  }

  getPackages(): void {
    this.packages_loading = true;
    this.packageService.getAllPackages().subscribe(
      (packages: any) => {
        packages.reverse();
        this.dataSource = new MatTableDataSource(packages);
        this.packages_loading = false;
      },
      (error) => {
        console.error('Error fetching packages:', error);
        this.packages_loading = false;
      }
    );
  }




  onSubmit(): void {
    if (this.packageForm.valid) {
      const packageData = this.packageForm.value;
      this.packageService.createPackage(packageData).subscribe(
        (response) => {
          this.getPackages()
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

  getTitle(role: string): string {
    // Implement logic to get the title based on the user's role
    return 'Package'; // Example title
  }

  applyFilter(event: Event): void {
    // Implement logic to filter packages based on user input
  }

  clearForm() {
    this.packageForm.reset();
  }
}
