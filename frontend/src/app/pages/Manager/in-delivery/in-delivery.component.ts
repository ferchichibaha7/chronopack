import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-in-delivery',
  standalone: true,
  imports: [CommonModule,PackageListComponent],
  templateUrl: './in-delivery.component.html',
  styleUrls: ['./in-delivery.component.scss']
})
export class InDeliveryComponent {
// Define the initial value of displayedColumns with the "select" column included
displayedColumns: string[] = ['package_id', 'description', 'sender_username', 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info', 'status', 'coursier', 'date', 'action'];
}
