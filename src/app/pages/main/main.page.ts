/* eslint-disable no-underscore-dangle */
import { Usuario } from 'src/app/models/usuario';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
import { UsuarioService } from '../../services/usuario.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { ComunicadosService } from '../../services/comunicados.service';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { PopComunicadosComponent } from '../../components/comunicados/pop-comunicados/pop-comunicados.component';
import { Comunicados } from '../../models/comunicados';
import { PopItemComunicadoComponent } from '../../components/comunicados/pop-item-comunicado/pop-item-comunicado.component';
import { OptionsService } from '../../services/options.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, OnDestroy, ViewWillEnter{
  constructor(
    private popCtrl: PopoverController,
    private comuncadoServ: ComunicadosService,
    private options: OptionsService
  ) {}
  ionViewWillEnter() {
    this.getComunicados();
  }
  loaded = false;
  time = 1600;
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
  list: Comunicados[]= [];
  subcription!: Subscription;
  ngOnInit() {
    // this.getComunicados();
    this.subcription = this.comuncadoServ._refresh$.subscribe(() => {
      this.getComunicados();
    });
  }
  getComunicados() {
    if(!this.options.verificaRol("ADMIN")){
      this.loaded = false;
      this.comuncadoServ.obtenerComunicadosPublico().subscribe((data: any[]) => {
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }else{
      this.loaded = false;
      this.comuncadoServ.obtenerComunicados().subscribe((data: any[]) => {
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }

  }
  async menuPop(e: Event){
    const popover = await this.popCtrl.create({
      component: PopComunicadosComponent,
      cssClass: 'custom-comunicado',
      event: e,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }
  async verComunicado(comunicado: Comunicados, e: Event){
    const popover = await this.popCtrl.create({
      component: PopItemComunicadoComponent,
      cssClass: 'custom-item-comunicado',
      event: e,
      translucent: true,
      componentProps:{
        comunicado: comunicado
      },
      mode: 'ios'
    });
    await popover.present();
  }
  verificaRol():boolean {
    if(this.options.verificaRol("ADMIN")){
      return true;
    }
    return false;
  }

}
