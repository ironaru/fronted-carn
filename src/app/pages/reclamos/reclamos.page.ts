import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { PopReclamosComponent } from '../../components/reclamos/pop-reclamos/pop-reclamos.component';
import { ReclamosService } from '../../services/reclamos.service';
import { Reclamos } from '../../models/reclamos';
import { PopItemReclamoComponent } from '../../components/reclamos/pop-item-reclamo/pop-item-reclamo.component';
import { Subscription } from 'rxjs';
import { OptionsService } from '../../services/options.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private popCtrl: PopoverController,
    private reclamoServ: ReclamosService,
    private options: OptionsService
    ) { }
  list: Reclamos[] =[];
  subscription: Subscription;
  ngOnInit() {

    this.chargeReclamos();
    this.subscription = this.reclamoServ._refresh$.subscribe(()=>{
      this.chargeReclamos();
    });

  }
  volverMenu(){
    this.navCtrl.navigateBack("/tabs/menu");
  }
  async menuPop(e: Event){
    const popover = await this.popCtrl.create({
      component: PopReclamosComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      mode: 'ios'
    });
    await popover.present();
  }
  btnA = true;
  chargeReclamos(){
    this.loaded = false;
    if (this.options.verificaRol('ADMIN')) {
      this.btnA = false;
      this.reclamoServ.obtenerReclamos().subscribe((data)=>{
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    } else if (this.options.verificaRol('SOCIO')) {
      this.reclamoServ.obtenerReclamosUser().subscribe((data)=>{
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }
  }
  loaded  = false;
  time = 1600;
  async popItem(e: Event, reclamo: Reclamos){
    const popover = await this.popCtrl.create({
      component: PopItemReclamoComponent,
      cssClass: 'custom-popover',
      event: e,
      componentProps: {
        'reclamo': reclamo
      },
      translucent: true,
      mode: 'ios'
    });
    await popover.present();

  }
  class(data: Reclamos): string{
    let clase = "pb-2 pt-2 no-atendido";
    if(data?.atendido){
      clase = "pb-2 pt-2 atendido";
    }
    return clase;
  }
}
