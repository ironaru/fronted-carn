import { ReclamosPageModule } from './../reclamos/reclamos.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'reclamos',
            loadChildren: () => import('../../pages/reclamos/reclamos.module').then(m => m.ReclamosPageModule)
          },
          {
            path: 'solicitudes',
            loadChildren: () => import('../../pages/solicitudes/solicitudes.module').then(m => m.SolicitudesPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: 'main/solicitudes',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
