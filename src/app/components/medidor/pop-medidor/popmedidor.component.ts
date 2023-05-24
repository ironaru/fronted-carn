import { PopoverController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { async } from '@angular/core/testing';
import { ModalMedidorComponent } from '../modal-medidor/modal-medidor.component';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Socio } from '../../../models/socio';

@Component({
  selector: 'app-popmedidor',
  templateUrl: './popmedidor.component.html',
  styleUrls: ['./popmedidor.component.scss']
})
export class PopmedidorComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private popCtrl: PopoverController) { }
  @Input() socio: Socio;
  ngOnInit() {

  }
  async nuevo(){
    const modal = await this.modalCtrl.create({
      component: ModalMedidorComponent,
      cssClass:'modal1',
      // swipeToClose: true,
      componentProps: {
        'socio': this.socio,
      },
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }

}
