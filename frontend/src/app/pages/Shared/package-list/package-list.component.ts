import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { CoolDialogService, CoolDialogsModule } from '@angular-cool/dialogs';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { PackageService } from '../../../services/packages.service';
import { MatPaginator } from '@angular/material/paginator';
import { Status } from '../../interfaces/status';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { UserService } from '../../admin/users/user.service';
import { DepotService } from 'src/app/services/depot.service';
import { CountUpdateService } from 'src/app/services/count-update.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule,NgxBarcode6Module,FormsModule, ReactiveFormsModule,TablerIconsModule,CoolDialogsModule],
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {

  @Input() status: string; // Declare the input property
  statusOptions :any = []
  coursiers : any = []
  depots : any = []
  @Input() from : string =''
  @Input() displayedColumns: string[] = [];
  @Input() showSelect: boolean = false;
  @Output() toggleFormVisibility: EventEmitter<boolean> = new EventEmitter<boolean>();
  showCreate: boolean = false;
  selectedPackageId: number;
  selectedStateId: any; // Define the property
  packages: any[] = [];
  packages_loading = false
  barcodeInput : any = ''
  selectedRows: any[] = [];
  selectedChoice: number = 5; // Default value is "Livré"
  selectedDelivery:any
  selectedDepot:any
  currentuser : any
  dataSource = new MatTableDataSource<any>(); // Use 'any' type here
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authservice : AuthService,private countUpdateService: CountUpdateService,private DepotService : DepotService, private userService:UserService, private router: Router,private cdr: ChangeDetectorRef,private fb: FormBuilder, private http: HttpClient, private packageService:PackageService,private _dialogsService: CoolDialogService,private snackBar: MatSnackBar){
  }
  ngOnInit(): void {
    this.getPackages()
    this.getcurrentUser()
    if(this.status == 'En stock' && this.from == 'depot'){
      this.loadUsers('coursier')
      this.loadDepots()
    }

    this.statusOptions = this.packageService.getAllStatusOptions()
  }

  getcurrentUser(){
    this.authservice.getUserData().subscribe(user=>{
      this.currentuser = user
    })
  }

 // Host listener for keydown events on the document
 @HostListener('document:keydown', ['$event'])
 handleKeyboardEvent(event: KeyboardEvent) {
   // Check if the key pressed is Enter (key code 13)

   if (event.keyCode === 13) {
    // Check if the scanned barcode ends with '|'
if (this.barcodeInput.endsWith('|')) {
  // Remove the '|' character from the end of the barcode
  this.barcodeInput = this.barcodeInput.slice(0, -1);

  this.addBybarcode()
}

     this.barcodeInput = ''; // Clear the input field after handling the barcode
   }
 }

 addBybarcode(){
  const filteredPackages = this.dataSource.data.filter((pack: any) => pack.package_id == this.barcodeInput);
  if (filteredPackages.length>0){
    const packageToAdd = filteredPackages[0];
  const existingPackageIndex = this.selectedRows.findIndex((row: any) => row.package_id === packageToAdd.package_id);

  if (existingPackageIndex === -1) {
    this.selectedRows.push(packageToAdd); // Add package to selectedRows if not already selected
    this.barcodeInput = ''; // Clear the input field after handling the barcode

  }
  }

 }
 isSelected(row: any): boolean {
  return this.selectedRows.indexOf(row) !== -1;
}

deselectPackage(pack: any) {
  const index = this.selectedRows.indexOf(pack);
  if (index !== -1) {
    this.selectedRows.splice(index, 1); // Retirer le package de selectedRows
  }
}

// Call this method whenever the relevant change occurs
triggerCountUpdate() {
  this.countUpdateService.emitCountUpdate();
}
  showSnackBar(message: string, color: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['test']
    });
  }

  toggleShowSelect() {
    this.toggleFormVisibility.emit(!this.showSelect); // Emit the event with the new value (false in this case)
  }

  downloadPdf(packageId: number) {
    const url = this.router.createUrlTree(['/bordereau', packageId]).toString();
    window.open(url, '_blank');
  }
  toggleSelection(row: any) {
    const index = this.selectedRows.indexOf(row);
    if (index >= 0) {
      this.selectedRows.splice(index, 1); // Remove row if already selected
    } else {
      this.selectedRows.push(row); // Add row to selectedRows array
    }

    console.log(this.selectedRows);

    // Manually trigger change detection to update checkbox state
    this.cdr.detectChanges();
  }





  async onStateSelectionChange(event:any,pack:any){
    console.log(this.statusOptions);

    const statusId1 = this.statusOptions.find((status: Status) => status.id === event.value) as Status | undefined;
    const packageid = pack.package_id


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
          packages.sort((a:any, b:any) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();


            return dateB -dateA   ; // Sort in descending order (latest first)

          });
          console.log(packages);

          this.dataSource = new MatTableDataSource(packages);
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
          packages.sort((a:any, b:any) => {
            const dateA = new Date(a.updatedAt).getTime();
            const dateB = new Date(b.updatedAt).getTime();


            return dateB -dateA    ; // Sort in descending order (latest first)

          });
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



  async updatePackageStateFromButton (pack : any,state : any,from:any){
    const alloptions = this.packageService.getAllStatusOptions()
    const statusId1 = alloptions.find((status: Status) => status.id === state) as Status | undefined;
    const packageid = pack.package_id
    const result = await this._dialogsService.showDialog({
      titleText: 'Confirmation',
      questionText:`Êtes-vous sûr de vouloir modifier l'état du colis "${packageid}:${pack.description}" de "${pack.status.statusName}" à "${statusId1?.statusName}" ?`,
      confirmActionButtonText: 'Changer état',
      cancelActionButtonText: 'Annuler',
      confirmActionButtonColor: 'primary',
    });

    if (result.isConfirmed) {
      this.updatePackageState(packageid,state)
    }
  }


  updatePackageState(package_id : any,state : any) {


    this.packageService.updatePackageStates([package_id],state)
    .subscribe(
      () => {
        this.getPackages()
        this.showCreate = false
        this.showSnackBar('Le statut du colis a été mis à jour avec succès.', 'green');
        this.triggerCountUpdate()
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

  sendToStock(){
    if(this.selectedRows.length>0){
    let packageIds = this.selectedRows.map(pkg => pkg.package_id);
    this.packageService.updatePackageStates(packageIds,4)
    .subscribe(
      () => {
        this.getPackages()
        this.selectedRows = []
        this.showSnackBar('Les statuts des colis a été mis à jour avec succès.', 'green');
        this.triggerCountUpdate()

        // Optionally, perform any other actions after updating the package state
      },
      (error: any) => {
        console.error('Error updating package state:', error);
        this.showSnackBar('Erreur lors de la mise à jour du statuts des colis.', 'red');
        // Handle error appropriately
      }
    );
  }

  }


  loadUsers(role: any): void {

    this.userService.getUsersByRole(role).subscribe(
      (users: any) => {
        users.reverse();
        this.coursiers = users
        this.selectedDelivery = this.coursiers.length > 0 ? this.coursiers[0].id : null;

      },
      (error: any) => {
        console.error('Error fetching coursiers:', error);
      }
    );
  }
  loadDepots(): void {

    this.DepotService.getAllDepots().subscribe(
      (depots: any) => {
        this.depots = depots
        this.selectedDepot = this.depots.length > 0 ? this.depots[0].depot_id : null;

      },
      (error: any) => {
        console.error('Error fetching depots:', error);
      }
    );
  }

  onchoiceAction(ev:any){}
  sendfromStock(from:string){
    if(from == 'delivery'){
      if(this.selectedRows.length>0){
        let packageIds = this.selectedRows.map(pkg => pkg.package_id);
        this.packageService.updatePackageStates(packageIds,5,this.selectedDelivery)
        .subscribe(
          () => {
            this.getPackages()
            this.selectedRows = []
            this.showSnackBar('Les statuts des colis a été mis à jour avec succès.', 'green');
            this.triggerCountUpdate()

            // Optionally, perform any other actions after updating the package state
          },
          (error: any) => {
            console.error('Error updating package state:', error);
            this.showSnackBar('Erreur lors de la mise à jour du statuts des colis.', 'red');
            // Handle error appropriately
          }
        );
      }
    }
    else{
      if(this.selectedRows.length>0){
        let packageIds = this.selectedRows.map(pkg => pkg.package_id);
        this.packageService.updatePackageStates(packageIds,3,null,this.selectedDepot)
        .subscribe(
          () => {
            this.getPackages()
            this.selectedRows = []
            this.showSnackBar('Les statuts des colis a été mis à jour avec succès.', 'green');
            this.triggerCountUpdate()

            // Optionally, perform any other actions after updating the package state
          },
          (error: any) => {
            console.error('Error updating package state:', error);
            this.showSnackBar('Erreur lors de la mise à jour du statuts des colis.', 'red');
            // Handle error appropriately
          }
        );
      }
    }
  }

}
