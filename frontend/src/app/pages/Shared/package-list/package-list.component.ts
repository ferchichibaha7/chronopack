import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { CoolDialogService, CoolDialogsModule } from '@angular-cool/dialogs';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PackageService } from '../../../services/packages.service';
import { MatPaginator } from '@angular/material/paginator';
import { Status } from '../../interfaces/status';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  @Input() status: string; // Declare the input property
  @Input() statusOptions : Status[] = []
  @Input() from : string =''
  @Input() displayedColumns: string[] = [];

  showCreate: boolean = false;
  selectedPackageId: number;
  selectedStateId: any; // Define the property
  packages: any[] = [];
  packages_loading = false
  dataSource = new MatTableDataSource<any>(); // Use 'any' type here
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private router: Router,private fb: FormBuilder, private http: HttpClient, private packageService:PackageService,private _dialogsService: CoolDialogService,private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.getPackages()
  }
  showSnackBar(message: string, color: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['test']
    });
  }

  downloadPdf(packageId: number) {
    const url = this.router.createUrlTree(['/bordereau', packageId]).toString();
    window.open(url, '_blank');
  }



  async onStateSelectionChange(event:any,pack:any){
    const statusId1 = this.statusOptions.find((status: Status) => status.id === event.value) as Status | undefined;    const packageid = pack.package_id
    const result = await this._dialogsService.showDialog({
      titleText: 'Confirmation',
      questionText:`Êtes-vous sûr de vouloir modifier l'état du colis "${packageid}:${pack.description}" de "${pack.status.statusName}" à "${statusId1?.statusName}" ?`,
      confirmActionButtonText: 'Changer état',
      cancelActionButtonText: 'Annuler',
      confirmActionButtonColor: 'primary',
    });

    if (result.isConfirmed) {
      this.updatePackageState(packageid,event.value)
    }
  }

  getPackages(): void {
    this.packages_loading = true;

    if (this.status) {
      this.packageService.getAllPackages(this.status).subscribe(
        (packages: any) => {
          packages.reverse();
          this.dataSource = new MatTableDataSource(packages);
          console.log(packages);

          this.dataSource.paginator = this.paginator;
          this.packages_loading = false;
        },
        (error) => {
          console.error('Error fetching packages:', error);
          this.packages_loading = false;
        }
      );
    } else {
      this.packageService.getAllPackages().subscribe(
        (packages: any) => {
          packages.reverse();
          this.dataSource = new MatTableDataSource(packages);
          this.dataSource.paginator = this.paginator;
          this.packages_loading = false;
        },
        (error) => {
          console.error('Error fetching packages:', error);
          this.packages_loading = false;
        }
      );
    }
  }

  getStatusControl(row: any): FormControl {
    return new FormControl(row.status.id);
  }


  updatePackageState(package_id : any,state : any) {
    this.packageService.updatePackageState(package_id,state)
    .subscribe(
      () => {
        this.getPackages()
        this.showCreate = false
        this.showSnackBar('Le statut du colis a été mis à jour avec succès.', 'green');

        // Optionally, perform any other actions after updating the package state
      },
      (error: any) => {
        console.error('Error updating package state:', error);
        this.showSnackBar('Erreur lors de la mise à jour du statut du colis.', 'red');
        // Handle error appropriately
      }
    );
  }

  getTitle(role: string): string {
    // Implement logic to get the title based on the user's role
    return 'Package'; // Example title
  }

  applyFilter(event:any): void {
    let filterValue =''
    if ( event?.target?.value){
      filterValue = event.target.value

    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // Implement logic to filter packages based on user input
  }
}
