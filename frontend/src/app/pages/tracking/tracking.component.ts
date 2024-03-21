import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { PackageService } from 'src/app/services/packages.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    TablerIconsModule,
  ],
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  packageId: string | null;
  packageData: any;
  packageHist: any;
  $primary = '#5d87ff';
  $accent = '#49beff';
  $warning = '#ffae1f';
  $error = '#fa896b';
  $success = '#13deb9';
  $white = '#ffffff';
  stats: any = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Payment received from John Doe of $385.90',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment was made of $64.95 to Michael',
    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'New sale recorded',
      link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'New arrival recorded',
      link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      subtext: 'Payment Done',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService
  ) {}
  ngOnInit() {
    // Extraire le paramètre 'packageid' de l'URL
    this.packageId = this.route.snapshot.queryParamMap.get('packageid');
    this.getPackageId();
  }

  getPackageId() {
    this.packageId = this.route.snapshot.queryParamMap.get('packageid');

    if (this.packageId) {
      console.log(this.packageId);

      this.fetchPackageById(+this.packageId); // Call the method to fetch package by ID
    } else {
      // Handle case when packageId is not provided in the URL
    }
  }

  fetchPackageById(packageId: number) {
    this.packageService.getPackageById(packageId).subscribe(
      (packageData: any) => {
        // Handle the response data here
        this.packageData = packageData;
        this.packageHist = packageData['packageHistory']
          ? packageData['packageHistory']
          : [];
        console.log(this.packageHist);
      },
      (error) => {
        // Handle error if any
        console.error('Error fetching package by ID:', error);
      }
    );
  }
  // Inside your Angular component class
  getBorderColor(stateId: number): string {
    if (stateId == 1 || stateId == 3 || stateId == 4 || stateId == 10) {
      return 'border-blue-500';
    } else if (stateId == 7 || stateId == 8) {
      return 'border-red-500';
    } else {
      return ''; // Return empty string or default border color class
    }
  }

  getTextColor(stateId: number): string {
    if (
      stateId === 1 ||
      stateId === 3 ||
      stateId === 4 ||
      stateId === 5 ||
      stateId === 10
    ) {
      return this.$primary;
    } else if (stateId == 7 || stateId == 9) {
      return this.$error;
    }
    else if (stateId == 2 ) {
      return this.$warning;
    }  else if (stateId == 6 || stateId == 8) {
      return this.$success;
    } else {
      return ''; // Return empty string or default text color class
    }
  }

  getIconName(stateId: number): string {
    switch (stateId) {
      case 1:
        return 'notes';
      case 2:
        return 'clock-pause';
      case 3:
        return 'truck';
      case 4:
        return 'building-warehouse';
      case 5:
        return 'car';
      case 6:
        return 'package';
      case 7:
        return 'arrow-back-up';
      case 8:
        return 'package';
      case 9:
        return 'x';
      case 10:
        return 'truck';

      default:
        return '';
    }
  }
}
