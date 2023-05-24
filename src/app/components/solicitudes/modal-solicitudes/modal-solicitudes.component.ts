import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Solicitudes } from '../../../models/solicitudes';
import { SolicitudesService } from '../../../services/solicitudes.service';

@Component({
  selector: 'app-modal-solicitudes',
  templateUrl: './modal-solicitudes.component.html',
  styleUrls: ['./modal-solicitudes.component.scss']
})
export class ModalSolicitudesComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private toastCtrl: ToastController,
    private solicitudServ: SolicitudesService
  ) { }

  ngOnInit() {
    this.form();
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
  solicitud: Solicitudes = new Solicitudes();
  solicitudForm: FormGroup;
  enviar(){
    this.solicitud.detalle = this.solicitudForm.value.detalle
    this.solicitudServ.subirSolicitud(this.solicitud).subscribe((data)=>{
      this.cerrar();
      this.presentToast("Solicitud registrada!");
    });

  }
  form(){
    this.solicitudForm = this.formB.group({
      detalle: ["", Validators.required]
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
}
