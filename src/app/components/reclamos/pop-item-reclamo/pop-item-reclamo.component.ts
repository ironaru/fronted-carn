import { Component, Input, OnInit } from '@angular/core';
import { Reclamos } from '../../../models/reclamos';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { ModalItemReclamoComponent } from '../modal-item-reclamo/modal-item-reclamo.component';
import { ReclamosService } from '../../../services/reclamos.service';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-pop-item-reclamo',
  templateUrl: './pop-item-reclamo.component.html',
  styleUrls: ['./pop-item-reclamo.component.scss']
})
export class PopItemReclamoComponent implements OnInit {
  @Input() reclamo: Reclamos;
  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private toastCtrl: ToastController,
    private reclamoServ: ReclamosService,
    private options: OptionsService
  ) { }

  ngOnInit() {
  }
  async modalReclamo(){
    const modal = await this.modalCtrl.create({
      component: ModalItemReclamoComponent,
      mode: 'ios',
      componentProps:{
        'reclamo': this.reclamo
      }
    });
    this.popCtrl.dismiss();
    await modal.present();
  }
  eliminarReclamo(){
    this.reclamoServ.eliminarReclamo(this.reclamo).subscribe(()=>{
      this.popCtrl.dismiss();
      this.presentToast("Reclamo eliminado");
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

  eliminarDisponible(): Boolean{
    if(!this.options.verificaRol("ADMIN") && !this.reclamo?.atendido){
      return true;
    }
    return false;
  }
}
