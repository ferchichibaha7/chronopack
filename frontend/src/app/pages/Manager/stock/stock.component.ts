import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule,PackageListComponent],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  showSelect = false
  // Define the initial value of displayedColumns with the "select" column included
  displayedColumns: string[] = ['package_id', 'description', 'sender_username', 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info', 'status', 'date', 'action'];
  // Method to toggle form visibility based on button click event
  toggleFormVisibility(event : any) {
    this.showSelect = !this.showSelect; // Toggle the value of showSelect
    this.updateDisplayedColumns(); // Update displayedColumns based on the new value of showSelect

  }

  // Method to update displayedColumns based on the value of showSelect
  updateDisplayedColumns() {
   if (this.showSelect) {
     // Include the "select" column if showSelect is true
     if (!this.displayedColumns.includes('select')) {
       this.displayedColumns.unshift('select');
     }
   } else {
     // Remove the "select" column if showSelect is false
     this.displayedColumns = this.displayedColumns.filter(column => column !== 'select');
   }
 }
}
