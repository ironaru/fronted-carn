import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ModalReclamosComponent } from '../modal-reclamos/modal-reclamos.component';

@Component({
  selector: 'app-pop-reclamos',
  templateUrl: './pop-reclamos.component.html',
  styleUrls: ['./pop-reclamos.component.scss']
})
export class PopReclamosComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async modalReclamo(){
    const modal = await this.modalCtrl.create({
      component: ModalReclamosComponent,
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
}
