import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Admin',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Shipments',
    iconName: 'cube-send',
    route: '/ui-components/badge',
  },
  {
    displayName: 'tracking',
    iconName: 'eye',
    route: '/ui-components/chips',
  },
  {
    displayName: 'packages',
    iconName: 'package',
    route: '/admin/packages',
  },
  {
    displayName: 'Statistics',
    iconName: 'chart-line',
    route: '/ui-components/menu',
  }

];
