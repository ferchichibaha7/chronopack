import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { MaterialModule } from '../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { PackageService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [CommonModule,NgxBarcode6Module ,MaterialModule,TablerIconsModule],
  templateUrl: './pdf-generator.component.html',
  styleUrls: ['./pdf-generator.component.scss']
})
export class PdfGeneratorComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent!: ElementRef;
  packageId: number | null = null; // Initialize with null  px2mmFactor : number
  packageData : any
  constructor(private route: ActivatedRoute, private router: Router, private packageService: PackageService) {


   }


  ngOnInit(): void {
    this.getPackageId()
  }


  getPackageId() {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      const idFromRoute = params.get('id');
      if (idFromRoute) {
        this.packageId = +idFromRoute; // Convert to number
        this.fetchPackageById(this.packageId); // Call the method to fetch package by ID
      } else {
        // Handle case when packageId is not provided in the URL
      }
    });
  }

  fetchPackageById(packageId: number) {
    this.packageService.getPackageById(packageId).subscribe(
      (packageData) => {
        // Handle the response data here
        this.packageData = packageData;
      },
      (error) => {
        // Handle error if any
        console.error('Error fetching package by ID:', error);
      }
    );
  }

  public convetToPDF()
  {

  var data = document.getElementById('contentToConvert');

  if(data){
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 210; // Width of the image (you can adjust this)
    var imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')

      const pdf =new jsPDF('p', 'mm', 'a4');;
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(`bordereau_${this.packageId}.pdf`); // Generated PDF
      });
  }

  }





}
