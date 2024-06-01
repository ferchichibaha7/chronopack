import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/packages.service';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { MaterialModule } from 'src/app/material.module';
import { DepotService } from 'src/app/services/depot.service';

@Component({
  selector: 'app-editpackage',
  standalone: true,
  imports: [CommonModule,  CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    TablerIconsModule,
    NgxBarcode6Module],
  templateUrl: './editpackage.component.html',
  styleUrls: ['./editpackage.component.scss']
})
export class EditpackageComponent implements OnInit {
  packageId:any
  packageData:any
  packageHist:any
  depot:any
  depots:any
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private DepotService : DepotService,

  ) {}
  ngOnInit() {
    // Extraire le paramètre 'packageid' de l'URL
    this.packageId = this.route.snapshot.queryParamMap.get('packageid');
    this.fetchPackageById( this.packageId);

  }

  fetchPackageById(packageId: number) {
    this.packageService.getPackageById(packageId).subscribe(
      (packageData: any) => {
        // Handle the response data here
        this.packageData = packageData;
        console.log(this.packageData);
        this.loadDepots()

        this.packageHist = packageData['packageHistory']
          ? packageData['packageHistory']
          : [];


      },
      (error) => {
        // Handle error if any
        console.error('Error fetching package by ID:', error);
      }
    );
  }

  loadDepots(): void {

    this.DepotService.getAllDepots().subscribe(
      (depots: any) => {
        this.depots = depots
console.log(this.depots);

      },
      (error: any) => {
        console.error('Error fetching depots:', error);
      }
    );


  }
  onDepotChange(newDepotId: number): void {
    this.packageData.depot.depot_id = newDepotId;
    console.log(`Depot changed to: ${newDepotId}`);
    // Additional logic if needed, such as saving the change to the server
  }
}
