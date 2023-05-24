import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContentGuard } from './guard/content.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',

  },
  {
    path: 'tabs',
    loadChildren: () => import('./components/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'tabs/main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'tabs/menu/profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'tabs/socios',
    loadChildren: () => import('./pages/socios/socios.module').then( m => m.SociosPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'tabs/medidor',
    loadChildren: () => import('./pages/medidor/medidor.module').then( m => m.MedidorPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'tabs/menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'user/reclamos',
    loadChildren: () => import('./pages/reclamos/reclamos.module').then( m => m.ReclamosPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'user/solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule),
    canActivate: [ContentGuard]
  },
  {
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule),
    // canActivate: [LoginGuard]
  },

  {
    path: 'user/cobros',
    loadChildren: () => import('./pages/cobros/cobros.module').then( m => m.CobrosPageModule),
    canActivate: [ContentGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
