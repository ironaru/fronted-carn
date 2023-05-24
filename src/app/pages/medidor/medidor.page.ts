import { OptionsService } from './../../services/options.service';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PopItemMedidorComponent } from '../../components/medidor/pop-item-medidor/pop-item-medidor.component';
import { PopmedidorComponent } from '../../components/medidor/pop-medidor/popmedidor.component';
import { Medidor } from '../../models/medidor';
import { MedidorService } from '../../services/medidor.service';

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.page.html',
  styleUrls: ['./medidor.page.scss'],
})
export class MedidorPage implements OnInit, OnDestroy, ViewWillEnter {
  constructor(
    private popoverCtrl: PopoverController,
    private medidorService: MedidorService,
    private options: OptionsService
  ) {}
  ionViewWillEnter() {
    this.medidores();
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  ngOnInit() {
    this.suscription = this.medidorService._refresh$.subscribe(() => {
      this.medidores();
    });
  }
  async itemPop(e: Event, medidor: Medidor) {
    const popover = await this.popoverCtrl.create({
      component: PopItemMedidorComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      componentProps: {
        medidor: medidor,
      },
      mode: 'ios',
    });
    await popover.present();
  }

  list: any[];
  suscription: Subscription;
  loaded  = false;
  time = 1000;
  btnAdd: boolean = false;
  textoBuscar = '';
  medidores() {
    if (this.options.verificaRol('ADMIN')) {
      this.btnAdd = true;
      this.loaded = false;
      return this.medidorService.getMedidores().subscribe((data) => {
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    } else if (this.options.verificaRol('SOCIO')) {
      this.loaded = false;
      return this.medidorService.getMedidoresUsuario().subscribe((data) => {
        this.list = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }
  }
  handleChange(event) {
    this.textoBuscar = event.target.value.toLowerCase();
  }
}
