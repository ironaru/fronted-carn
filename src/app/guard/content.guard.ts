/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ContentGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private usuarioServ: UsuarioService,
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.usuarioServ.isLoggedIn()){
      this.usuarioServ.online().subscribe((data)=>{
        return true;
      },(error)=>{
        if(error.status == 401){
          this.usuarioServ.logout();
          this.navCtrl.navigateForward("/login");
          return true;
        }else {
          this.navCtrl.navigateForward("/login");
          return true;
        }
      });
    }else{
      this.navCtrl.navigateForward("/login");
      return true;
    }
  }

}
