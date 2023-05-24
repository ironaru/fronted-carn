import { FacturaComponent } from './../factura/factura.component';
import {
  PopoverController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ConsumosService } from '../../../services/consumos.service';

@Component({
  selector: 'app-pop-item-consumo',
  templateUrl: './pop-item-consumo.component.html',
  styleUrls: ['./pop-item-consumo.component.scss'],
})
export class PopItemConsumoComponent implements OnInit {
  @Input() consumo: any;
  constructor(
    private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private consumoServ: ConsumosService
  ) {}

  ngOnInit() {}

  async facturar() {
    this.consumoServ.getTarifas(this.consumo).subscribe(async (data) => {
      if (data[0] != undefined || data[0] != null) {
        const modal = await this.modalCtrl.create({
          component: FacturaComponent,
          cssClass: 'custom-modal',
          // swipeToClose: true,
          componentProps: {
            consumo: this.consumo,
            tarifa: data[0]
          },
          mode: 'ios'
        });
        await this.popCtrl.dismiss();
        await modal.present();
      }else{
        this.presentToast("No existe tarifa para la fecha de consumo!");
        await this.popCtrl.dismiss();
      }
    });
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 3000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });
    await toast.present();
  }
}
