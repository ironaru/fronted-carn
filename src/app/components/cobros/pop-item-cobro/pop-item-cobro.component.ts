import { Component, OnInit, Input } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Cobros } from 'src/app/models/cobros';
import { ModalItemCobroComponent } from '../modal-item-cobro/modal-item-cobro.component';

@Component({
  selector: 'app-pop-item-cobro',
  templateUrl: './pop-item-cobro.component.html',
  styleUrls: ['./pop-item-cobro.component.scss']
})
export class PopItemCobroComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
  }
  @Input() cobro: Cobros;
  async modalCobro(){
    const modal = await this.modalCtrl.create({
      component: ModalItemCobroComponent,
      animated: true,
      componentProps: {
        'cobro': this.cobro
      },
      cssClass: '',
      mode:'ios'
    });
    this.popCtrl.dismiss();
    modal.present();
  }
}
