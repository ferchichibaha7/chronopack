import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Administrateur',
    roles:['Administrateur']
  },
  {
    navCap: 'Fournisseur',
    roles:['Fournisseur']

  },
  {
    navCap: 'Magasinier',
    roles:['Magasinier']
  },
  {
    navCap: 'Livreur',
    roles:['Coursier']
  },
  {
    navCap: 'Chef de dépôt',
    roles:['Manager']
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',

  },
  {
    displayName: 'Gestion des utilisateurs',
    iconName: 'users',
    isExpanded:false,
    twoLines:true,
    roles:['Administrateur'],
    children:[
      {
        displayName: 'Administrateur',
        iconName: 'minus',
        route: '/utilisateurs/Administrateur',
      },
      {
        displayName: 'Chef de dépôt',
        iconName: 'minus',
        route: '/utilisateurs/manager',
      },
      {
        displayName: 'Magasinier',
        iconName: 'minus',
        route: '/utilisateurs/magasinier',
      },
      {
        displayName: 'Fournisseur',
        iconName: 'minus',
        route: '/utilisateurs/fournisseur',
      },
      {
        displayName: 'Livreur',
        iconName: 'minus',
        route: '/utilisateurs/coursier',
      }

    ]
  },
  {
    displayName: 'Paramètres',
    iconName: 'settings',
    route: '/settings',
    roles:['Administrateur']
  },
  {
    displayName: 'packages',
    iconName: 'package',
    route: '/admin/packages',
    roles:['Coursier','Magasinier','Manager']
  },
  {
    displayName: 'Payement',
    iconName: 'chart-line',
    route: '/ui-components/menu',
    roles:['Manager']
  }

];
