import { ModalTarifaComponent } from './../modal-tarifa/modal-tarifa.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-tarifas',
  templateUrl: './pop-tarifas.component.html',
  styleUrls: ['./pop-tarifas.component.scss']
})
export class PopTarifasComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private popCtrl: PopoverController) { }

  ngOnInit() {
  }
  async nuevaTarifa(){
    const modal = await this.modalCtrl.create({
      component: ModalTarifaComponent,
      cssClass:'modal1',
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }

}
