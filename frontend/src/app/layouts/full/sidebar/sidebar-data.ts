import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Administrateur',
    roles:['Admin']
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
    twoLines:true,
    roles:['Admin'],
    children:[
      {
        displayName: 'Administrateur',
        iconName: 'minus',
        route: '/utilisateurs/admin',
      },
      {
        displayName: 'Fournisseur',
        iconName: 'minus',
        route: '/utilisateurs/fournisseur',
      },
      {
        displayName: 'Magasinier',
        iconName: 'minus',
        route: '/utilisateurs/magasinier',
      },
      {
        displayName: 'Livreur',
        iconName: 'minus',
        route: '/utilisateurs/livreur',
      },
      {
        displayName: 'Chef de dépôt',
        iconName: 'minus',
        route: '/utilisateurs/chef-depot',
      }
    ]
  },
  {
    displayName: 'Paramètres',
    iconName: 'settings',
    route: '/settings',
    roles:['Admin']
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
