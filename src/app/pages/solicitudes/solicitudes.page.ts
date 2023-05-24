import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { SolicitudesService } from '../../services/solicitudes.service';
import { Solicitudes } from '../../models/solicitudes';
import { OptionsService } from '../../services/options.service';
import { PopSolicitudesComponent } from '../../components/solicitudes/pop-solicitudes/pop-solicitudes.component';
import { PopItemSolicitudComponent } from '../../components/solicitudes/pop-item-solicitud/pop-item-solicitud.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private solicitudeServ: SolicitudesService,
    private options: OptionsService,
    private popCtrl: PopoverController
  ) { }
  list: Solicitudes[] =[];
  roles: any[] = [];
  subscription: Subscription;
  ngOnInit() {
    this.data();
    this.subscription = this.solicitudeServ._refresh$.subscribe(() => {
      this.data();
    });
  }
  volverMenu(){
    this.navCtrl.navigateBack("/tabs/menu");
  }
  btnA = true;
  loaded  = false;
  time = 1600;
  data(){
    this.loaded = false;
    if (this.options.verificaRol('ADMIN')) {
      this.btnA = false;
      this.solicitudeServ.obtenerSolicitudes().subscribe((data)=>{
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    } else{
      this.solicitudeServ.obtenerSolicitudesUser().subscribe((data)=>{
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }
  }
  async popItem(e: Event, solicitud: Solicitudes){
    const popover = await this.popCtrl.create({
      component: PopItemSolicitudComponent,
      cssClass: 'custom-popover',
      event: e,
      componentProps: {
        'solicitud': solicitud
      },
      translucent: true,
      mode: 'ios'
    });
    await popover.present();

  }
  async menuPop(e: Event){
    const popover = await this.popCtrl.create({
      component: PopSolicitudesComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }
  class(data: Solicitudes): string{
    let clase = "pb-2 pt-2 no-atendido";
    if(data?.atendido){
      clase = "pb-2 pt-2 atendido";
    }
    return clase;
  }

}
