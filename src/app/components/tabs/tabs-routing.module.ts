import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../../pages/main/main.module').then(m => m.MainPageModule)
      },
      {
        path: 'socios',
        loadChildren: () => import('../../pages/socios/socios.module').then(m => m.SociosPageModule)
      },
      {
        path: 'medidor',
        loadChildren: () => import('../../pages/medidor/medidor.module').then(m => m.MedidorPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('../../pages/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'tarifas',
        loadChildren: () => import('../../pages/tarifas/tarifas.module').then(m => m.TarifasPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
