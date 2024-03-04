import { Component, Input, OnChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { navItems } from '../sidebar-data';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;
  expandedParent: NavItem | null = null; // Track the currently expanded parent
  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }


    // Check if the clicked item is a parent item
    if (item.children && item.children.length > 0) {
      // Toggle the expansion state of the clicked item
      item.isExpanded = !item.isExpanded;
      if (item.isExpanded) {
        // If item is expanded, set it as the expanded parent
        this.expandedParent = item;
      } else {
        // If item is collapsed, reset the expanded parent
        this.expandedParent = null;
      }

      // Collapse children of other parent items
     navItems.forEach((navItem: NavItem) => {
        if (navItem !== item) {
          navItem.isExpanded = false;
        }
      });
    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }

}}
