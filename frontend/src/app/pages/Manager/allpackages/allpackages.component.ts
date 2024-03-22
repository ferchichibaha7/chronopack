import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-allpackages',
  standalone: true,
  imports: [CommonModule,PackageListComponent],
  templateUrl: './allpackages.component.html',
  styleUrls: ['./allpackages.component.scss']
})
export class AllpackagesComponent {
  displayedColumns: string[] = ['package_id', 'description','sender_username' , 'price', 'receiver_name', 'receiver_address', 'receiver_contact_info','status','date','action'];

}
