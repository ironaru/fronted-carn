import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reclamos } from '../../../models/reclamos';
import { ReclamosService } from '../../../services/reclamos.service';

@Component({
  selector: 'app-modal-reclamos',
  templateUrl: './modal-reclamos.component.html',
  styleUrls: ['./modal-reclamos.component.scss']
})
export class ModalReclamosComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private reclamoServ: ReclamosService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.form();
  }
  reclamo: Reclamos = new Reclamos();
  reclamoForm: FormGroup;
  cerrar(){
    this.modalCtrl.dismiss();
  }
  form(){
    this.reclamoForm = this.formB.group({
      detalle: ["", Validators.required]
    });
  }
  enviar(){
    this.reclamo.detalle = this.reclamoForm.value.detalle;
    this.reclamoServ.subirReclamo(this.reclamo).subscribe(()=>{
      this.cerrar();
      this.presentToast("Reclamo agregado!");
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
