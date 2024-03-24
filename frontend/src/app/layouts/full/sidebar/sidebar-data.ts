import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Page d\'accueil',
  },

  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',

  },

  {
    displayName: 'Utilisateurs',
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
    displayName: 'Mes Colis',
    iconName: 'package',
    route: '/packages',
    roles:['Fournisseur']
  },
  {
    displayName: 'Tous les colis',
    iconName: 'package',
    route: '/allpackages',
    roles:['Manager','Magasinier']
  },
  {
    displayName: 'Suivi colis',
    iconName: 'scan-eye',
    route: '/tracking',
  },
  {
    displayName: 'Stock',
    iconName: 'building-warehouse',
    state:'En stock',
    count:true,
    route: '/stock',
    roles:['Manager','Magasinier']
  },
  {
    displayName: 'En attente',
    state:'En attente de ramassage',
    count:true,
    iconName: 'clock-hour-5',
    route: '/en-attente',

    roles:['Manager','Magasinier']
  },
  {
    displayName: 'Pickup',
    iconName: 'package-import',
    state:'Pickup',
    count:true,
    route: '/pickup',
    roles:['Manager','Magasinier']
  },
  {
    displayName: 'Transit',
    iconName: 'truck-delivery',
    state:'En transit',
    count:true,
    route: '/transit',
    roles:['Manager','Magasinier']
  },
  {
    displayName: 'En livraison',
    iconName: 'car',
    state:'En cours de livraison',
    count:true,
    twoLines:true,
    route: '/indelivery',
    roles:['Manager','Magasinier']
  },

  {
    displayName: 'Payement',
    iconName: 'chart-line',
    route: '/ui-components/menu',
    roles:['Manager']
  }

];
