import { Component, Input, OnInit } from '@angular/core';
import { Comunicados } from '../../../models/comunicados';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModalItemComunicadoComponent } from '../modal-item-comunicado/modal-item-comunicado.component';
import { ComunicadosService } from '../../../services/comunicados.service';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-pop-item-comunicado',
  templateUrl: './pop-item-comunicado.component.html',
  styleUrls: ['./pop-item-comunicado.component.scss']
})
export class PopItemComunicadoComponent implements OnInit {
  @Input() comunicado: Comunicados;
  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private comunicadoServ: ComunicadosService,
    private toastCtrl: ToastController,
    private options: OptionsService
    ) { }

  ngOnInit() {
  }

  async verComunicado(){
    const modal = await this.modalCtrl.create({
      component: ModalItemComunicadoComponent,
      cssClass:'modal1',
      componentProps:{
        comunicado: this.comunicado
      },
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
  eliminarComunicado(){
    this.comunicadoServ.eliminarComunicado(this.comunicado).subscribe(async ()=>{
      await this.popCtrl.dismiss();
      this.presentToast("Comunicado eliminado!");
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
  verificaRol():boolean {
    if(this.options.verificaRol("ADMIN")){
      return true;
    }
    return false;
  }
}
