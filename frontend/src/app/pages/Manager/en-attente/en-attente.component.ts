import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from '../../Shared/package-list/package-list.component';

@Component({
  selector: 'app-en-attente',
  standalone: true,
  imports: [CommonModule,PackageListComponent],
  templateUrl: './en-attente.component.html',
  styleUrls: ['./en-attente.component.scss']
})
export class EnAttenteComponent {

}
