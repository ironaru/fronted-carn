import { ModalConsumoComponent } from './../modal-consumo/modal-consumo.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-consumo',
  templateUrl: './pop-consumo.component.html',
  styleUrls: ['./pop-consumo.component.scss']
})
export class PopConsumoComponent implements OnInit {
  @Input() medidor:number;
  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  async agregarConsumo(){
    const modal = await this.modalCtrl.create({
      component: ModalConsumoComponent,
      cssClass:'custom-modal',
      // swipeToClose: true,
      componentProps: {
        'medidor': this.medidor
      },
      mode: 'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
    // const { role } = await modal.onWillDismiss();
  }

}
