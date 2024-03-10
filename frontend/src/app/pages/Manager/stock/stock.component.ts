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
  displayedColumns: string[] = ['package_id', 'description','sender_username' , 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info','status', 'status_statusName','date','action'];

}
