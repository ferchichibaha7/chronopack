import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-delivered-payed',
  standalone: true,
  imports: [CommonModule,PackageListComponent],
  templateUrl: './delivered-payed.component.html',
  styleUrls: ['./delivered-payed.component.scss']
})
export class DeliveredPayedComponent {

// Define the initial value of displayedColumns with the "select" column included

displayedColumns: string[] = ['package_id', 'description', 'sender_username', 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info', 'status', 'coursier','date', 'action'];

}
