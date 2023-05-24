import { ModalCobrosComponent } from './../../consumo-medidor/modal-cobros/modal-cobros.component';
import { MedidorService } from '../../../services/medidor.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/member-ordering */
import { ModalPerfilMedidorComponent } from '../modal-perfil-medidor/modal-perfil-medidor.component';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Medidor } from '../../../models/medidor';
import { ConsumosComponent } from '../../consumo-medidor/consumos/consumos.component';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-pop-item-medidor',
  templateUrl: './pop-item-medidor.component.html',
  styleUrls: ['./pop-item-medidor.component.scss']
})
export class PopItemMedidorComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private medidorServ: MedidorService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private options: OptionsService
    ) { }
  @Input() medidor: Medidor;
  ngOnInit() {
  }
   async verMedidor(){
    const modal = await this.modalCtrl.create({
      component: ModalPerfilMedidorComponent,
      cssClass:'modal1',
      // swipeToClose: true,
      componentProps: {
        'medidor': this.medidor
      },
      mode: 'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
  async eliminarMedidor(){
    const alert = await this.alertCtrl.create({
      header: 'Confirmar para eliminar',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            alert.onDidDismiss();
          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            alert.onDidDismiss();
            this.medidorServ.eliminarMedidor(this.medidor.id).subscribe(async ()=> {
              this.presentToast();
            });
          },
        },
      ],
    });
    this.popCtrl.dismiss()
    await alert.present();
  }
  async verConsumos(){
    const modal = await this.modalCtrl.create({
      component: ConsumosComponent,
      cssClass:'',
      // swipeToClose: true,
      componentProps: {
        'medidor': this.medidor.id
      },
      mode: 'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Medidor eliminado!',
      position: 'middle',
      duration: 1800,
      cssClass: 'custom-toast',
      icon: 'trash',
      mode: 'ios'
    });
    await toast.present();
  }
  async verCobros(){
    const modal = await this.modalCtrl.create({
      component: ModalCobrosComponent,
      cssClass:'',
      // swipeToClose: true,
      componentProps: {
        'medidor': this.medidor.id
      },
      mode: 'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
  verificaRol():boolean {
    if(this.options.verificaRol('ADMIN')){
      return true;
    }
    return false;
  }
}
