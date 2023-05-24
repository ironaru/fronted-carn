import { Component, Input, OnInit } from '@angular/core';
import { Solicitudes } from '../../../models/solicitudes';
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
import { ModalItemSolicitudComponent } from '../modal-item-solicitud/modal-item-solicitud.component';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-pop-item-solicitud',
  templateUrl: './pop-item-solicitud.component.html',
  styleUrls: ['./pop-item-solicitud.component.scss']
})
export class PopItemSolicitudComponent implements OnInit {
  @Input() solicitud: Solicitudes;
  constructor(
    private popCtrl: PopoverController,
    private modalCtrl: ModalController,
    private solicitudServ: SolicitudesService,
    private toastCtrl: ToastController,
    private options: OptionsService
  ) { }

  ngOnInit() {
  }
  async modalSolicitud(){
    const modal = await this.modalCtrl.create({
      component: ModalItemSolicitudComponent,
      mode: 'ios',
      componentProps:{
        'solicitud': this.solicitud
      }
    });
    this.popCtrl.dismiss();
    await modal.present();
  }

  eliminarSolicitud(){
    this.solicitudServ.eliminarSolicitud(this.solicitud).subscribe((data)=>{
      this.popCtrl.dismiss();
      this.presentToast("Solicitud eliminada!");
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
    if(!this.options.verificaRol("ADMIN") && !this.solicitud?.atendido){
      return true;
    }
    return false;
  }

}
