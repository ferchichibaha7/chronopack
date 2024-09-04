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
import { UserService } from '../users/user.service';
import { ReasonsService } from 'src/app/services/reasons.service';

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
  packageData: any
  packageHist:any
  depot:any
  coursid:any
  depots:any
  selectedReason:any
  reasid:any
  statuses = [
    { id: 1, statusName: 'Brouillon' },
    { id: 2, statusName: 'En attente de ramassage' },
    { id: 3, statusName: 'En transit' },
    { id: 4, statusName: 'En stock' },
    { id: 5, statusName: 'En cours de livraison' },
    { id: 6, statusName: 'Livré' },
    { id: 7, statusName: 'Retourné' },
    { id: 8, statusName: 'Livré et payé' },
    { id: 9, statusName: 'Annulé' },
    { id: 10, statusName: 'Pickup' },
  ];
  coursiers :any

  reasons  : any

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private DepotService : DepotService,
    private UserService : UserService,
    private reasonsService: ReasonsService,


  ) {}
  ngOnInit() {
    // Extraire le paramètre 'packageid' de l'URL
    this.packageId = this.route.snapshot.queryParamMap.get('packageid');
    this.fetchPackageById( this.packageId);
    this.fetchCoursier()
    this.loadReasons()

  }

  onStatusChange(statusId: number): void {
    console.log('Selected status ID:', statusId);
    // Handle the status change logic here
  }

  fetchPackageById(packageId: number) {
    this.packageService.getPackageById(packageId).subscribe(
      (packageData: any) => {
        // Handle the response data here
        this.packageData = packageData;
        this.loadDepots()
console.log(packageData);

        this.packageHist = packageData['packageHistory']
          ? packageData['packageHistory'].reverse()
          : [];

          if(this.packageHist.length>0){
            this.coursid = this.packageHist[0].coursier_id
            this.reasid = this.packageHist[0].reason_id
          }


      },
      (error) => {
        // Handle error if any
        console.error('Error fetching package by ID:', error);
      }
    );
  }

  fetchCoursier() {

    this.UserService.getUsersByRole('coursier').subscribe(
      (coursier: any) => {
        // Handle the response data here
        this.coursiers = coursier;
console.log(coursier);





      },
      (error) => {
        // Handle error if any
        console.error('Error fetching coursier:', error);
      }
    );
  }
  loadReasons(): void {
    this.reasonsService.getAllreasons().subscribe(
      (reasons: any) => {
        console.log(reasons);

        this.reasons = reasons;
        this.selectedReason =
          this.reasons.length > 0 ? this.reasons[0].reason_id : null;
        console.log(reasons);
      },
      (error: any) => {
        console.error('Error fetching depots:', error);
      }
    );
  }
  onSubmit(): void {
    if (!this.packageData) return;
console.log(this.packageData);
console.log(this.packageHist);


    const packageUpdate = {
      packageId: this.packageData.package_id,
      newData: {
        status_id: this.packageData.status_id,
        depot_id: this.packageData.depot.depot_id,
        coursier_id: this.coursid,
        reason_id: this.reasid
      }
    };

    const packageUpdates = { packageUpdates: [packageUpdate] };
    this.packageService.updatePackage(packageUpdates).subscribe(
      (packageData: any) => {
        // Handle the response data

          console.log('Package updated successfully', packageData);

      })}




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
  onstatusChange(): void {
   this.coursid = null;
   this.reasid = null
    // Additional logic if needed, such as saving the change to the server
  }
}



