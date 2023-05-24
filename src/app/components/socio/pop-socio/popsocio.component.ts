import { ModalController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ModalSocioComponent } from '../modal-socio/modal-socio.component';

@Component({
  selector: 'app-popsocio',
  templateUrl: './popsocio.component.html',
  styleUrls: ['./popsocio.component.scss'],
})
export class PopsocioComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private popCtrl: PopoverController) { }

  ngOnInit() {}

   async nuevoSocio(){
    const modal = await this.modalCtrl.create({
      component: ModalSocioComponent,
      cssClass:'modal1',
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
}
