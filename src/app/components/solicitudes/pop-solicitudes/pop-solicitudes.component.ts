import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ModalSolicitudesComponent } from '../modal-solicitudes/modal-solicitudes.component';

@Component({
  selector: 'app-pop-solicitudes',
  templateUrl: './pop-solicitudes.component.html',
  styleUrls: ['./pop-solicitudes.component.scss']
})
export class PopSolicitudesComponent implements OnInit {

  constructor(
    private popCtrl: PopoverController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  async modalSolicitud(){
    const modal = await this.modalCtrl.create({
      component: ModalSolicitudesComponent,
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
}
