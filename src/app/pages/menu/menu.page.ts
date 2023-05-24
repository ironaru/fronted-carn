import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, ViewWillEnter } from '@ionic/angular';
import { Solicitudes } from '../../models/solicitudes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy, ViewWillEnter{

  constructor(
    private navCtrl: NavController,
    private usuarioServ: UsuarioService
  ) { }
  subscription: Subscription;
  ionViewWillEnter(){
    this.getUsuario();
  }
  ngOnDestroy(){

  }
  user: any;
  ngOnInit() {
    this.getUsuario();

  }
  getUsuario(){
    this.user = this.usuarioServ.getUser();
  }
  fotoVacia(data: any){
    if(data.socio.foto == null || data.socio.foto == ""){
      data.socio.foto = "assets/images/avatar.svg";
    }
    return true;
  }
  cerrarSesion() {
    this.usuarioServ.logout();
    this.navCtrl.navigateForward("/login");
  }
  profile(){
    this.navCtrl.navigateRoot("/tabs/menu/profile");
  }
  reclamos(){
    this.navCtrl.navigateRoot("/user/reclamos");
  }
  solicitudes(){
    this.navCtrl.navigateRoot("/user/solicitudes");
  }
  cobros(){
    this.navCtrl.navigateRoot("/user/cobros");
  }

}
