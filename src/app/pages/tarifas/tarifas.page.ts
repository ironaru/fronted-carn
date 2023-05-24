import { OptionsService } from './../../services/options.service';
import { TarifasService } from './../../services/tarifas.service';
import { PopTarifasComponent } from './../../components/tarifas/pop-tarifas/pop-tarifas.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.page.html',
  styleUrls: ['./tarifas.page.scss'],
})
export class TarifasPage implements OnInit, OnDestroy, ViewWillEnter{

  constructor(
    private popCtrl: PopoverController,
    private tarifaServ: TarifasService,
    private options: OptionsService
    ) { }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ionViewWillEnter() {
    this.getLista();
    if (this.options.verificaRol('ADMIN')) {
      this.btnAdd = true;
    }
  }

  list: any[] = [];
  roles: any[] = [];
  btnAdd: boolean = false;
  subscription: Subscription;
  ngOnInit() {
    if (this.options.verificaRol('ADMIN')) {
      this.btnAdd = true;
    }
    this.subscription = this.tarifaServ._refresh$.subscribe(()=>{
      this.getLista();
    });
  }
  async menuPop(e: Event){
    const popover = await this.popCtrl.create({
      component: PopTarifasComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      // side:'left',
      // alignment:'start',
      mode: 'ios'
    });
    await popover.present();
  }
  getLista(){
    this.loaded = false;
    this.tarifaServ.getTarifas$().subscribe((data) =>{
      this.list = data;
      setTimeout(() => {
        this.loaded = true;
      }, this.time);
    });
  }
  time = 1000;
  loaded  = false;

}
