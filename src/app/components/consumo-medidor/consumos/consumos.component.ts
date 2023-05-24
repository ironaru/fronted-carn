import { PopItemConsumoComponent } from './../pop-item-consumo/pop-item-consumo.component';
import { PopConsumoComponent } from './../pop-consumo/pop-consumo.component';
import { ConsumosService } from '../../../services/consumos.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.scss']
})
export class ConsumosComponent implements OnInit, OnDestroy {

  constructor(
    private modalCtrl: ModalController,
    private consumoServ: ConsumosService,
    private popCtrl: PopoverController,
    private options: OptionsService
    ) { }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  @Input() medidor: number;
  list: any[]= [];
  suscription: Subscription;
  lecturado = false;
  time = 1000;
  loaded  = false;
  ngOnInit() {
    this.getConsumos();
    this.suscription = this.consumoServ._refresh$.subscribe(() =>{
      this.getConsumos();
    });
  }
  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  getConsumos(){
    this.loaded = false;
    this.consumoServ.getConsumos(this.medidor).subscribe((data)=>{
      this.list = data;
      setTimeout(() => {
        this.loaded = true;
      }, this.time);
    });
  }
  verificaRol():boolean{
    if(this.options.verificaRol('ADMIN') || this.options.verificaRol('LECTURADOR')){
      return true;
    }
    return false;
  }
  async menuPop(e: Event){

      const popover = await this.popCtrl.create({
        component: PopConsumoComponent,
        cssClass: 'custom-popover-consumo',
        event: e,
        translucent: true,
        // side:'left',
        componentProps: {
          'medidor': this.medidor
        },
        showBackdrop: false,
        // alignment:'center',
        mode: 'ios'
      });
      await popover.present();

  }
  async popItemConsumo(e: Event, consumo : any){
    if(this.options.verificaRol('ADMIN') || this.options.verificaRol('CAJERO')){
      const popover = await this.popCtrl.create({
        component: PopItemConsumoComponent,
        cssClass: 'custom-popover-consumo',
        event: e,
        translucent: true,
        // side:'left',
        componentProps: {
          'consumo': consumo
        },
        showBackdrop: false,
        // alignment:'center',
        mode: 'ios'
      });
      await popover.present();
    }

  }
}
