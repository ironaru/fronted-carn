import { PopItemSocioComponent } from './../../components/socio/pop-item-socio/pop-item-socio.component';
import { PopsocioComponent } from '../../components/socio/pop-socio/popsocio.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.page.html',
  styleUrls: ['./socios.page.scss'],
})
export class SociosPage implements OnInit, OnDestroy, ViewWillEnter{
  list: any[]= [];
  textoBuscar = "";
  suscription: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private popCtrl: PopoverController
    ) { }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  ionViewWillEnter() {
    this.usuarios();
  }

  ngOnInit() {
    this.suscription = this.usuarioService._refresh$.subscribe(() =>{
      this.usuarios();
    });
  }
  fotoVacia(data: any){
    if(data.socio.foto == null || data.socio.foto == ""){
      data.socio.foto = "assets/images/avatar.svg";
    }
    return true;
  }
  usuarios() {
    this.loaded = false;
    this.usuarioService.getUsuarios().subscribe(data =>{
      this.list = data.filter((item)=> item.id !== this.usuarioService.getUser().id);
      setTimeout(() => {
        this.loaded = true;
      }, this.time);
    });
  }
  delete(item: any){
    this.usuarioService.deleteUser(item.id).subscribe();
  }
  userActual(data: Usuario): boolean{
    if(data.id != this.usuarioService.getUsuario().id){
      return true;
    }
    return false;
  }

  //popover-socios
  async menuPop(e: Event){
    const popover = await this.popCtrl.create({
      component: PopsocioComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }
  async itemSocio(e: Event,usuario: Usuario){
    const popover = await this.popCtrl.create({
      component: PopItemSocioComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      componentProps: {
        'usuario': usuario
      },
      mode: 'ios'
    });
    await popover.present();
  }


  handleChange(event) {
    this.textoBuscar = event.target.value.toLowerCase();
  }
  loaded= false;
  time = 1000;
}
