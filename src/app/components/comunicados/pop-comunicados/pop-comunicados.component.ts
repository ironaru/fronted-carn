import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { ModalComunicadosComponent } from '../modal-comunicados/modal-comunicados.component';

@Component({
  selector: 'app-pop-comunicados',
  templateUrl: './pop-comunicados.component.html',
  styleUrls: ['./pop-comunicados.component.scss']
})
export class PopComunicadosComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private popCtrl: PopoverController) { }

  ngOnInit() {
  }
  async nuevoComunicado(){
    const modal = await this.modalCtrl.create({
      component: ModalComunicadosComponent,
      cssClass:'modal1',
      mode: 'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
}
