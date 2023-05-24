import { Medidor } from '../../../models/medidor';
/* eslint-disable @typescript-eslint/naming-convention */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { MedidorService } from '../../../services/medidor.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-medidor',
  templateUrl: './modal-medidor.component.html',
  styleUrls: ['./modal-medidor.component.scss'],
})
export class ModalMedidorComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private medidorServ: MedidorService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private datePipe : DatePipe
  ) {}
  @Input() socio: any;
  ngOnInit() {
    this.form();
  }
  cancelar() {
    this.modalCtrl.dismiss({
      cancelar: true,
    });
  }
  medidorForm: FormGroup;
  medidor: Medidor = new Medidor();
  today = this.datePipe.transform(new Date(),"yyyy-MM-dd");

  form() {
    this.medidorForm = this.fb.group({
      serial: ['', Validators.required],
      marca: ['', Validators.required],
      regInic: [0,[Validators.min(0) ,Validators.required]],
      fechaInst: [this.today, [Validators.required]],
    });
  }
  send(): any {
    const params = {
      serial: this.medidorForm.value.serial,
      marca: this.medidorForm.value.marca,
      regInic: this.medidorForm.value.regInic,
      fechaInst: this.medidorForm.value.fechaInst,
      idSocio: { id: this.socio.id},
    };
    return params;
  }

  confirmar() {
    this.medidorServ.addMedidor(this.send()).subscribe((data:any) => {
      if(data?.message == "OK"){
        this.presentToast("Medidor añadido!");
        this.modalCtrl.dismiss();
      }else {
        this.presentToast(data?.message);
      }

    },(error)=>{
      if(error.status == 401) {
        this.presentToast(error.error.message);
      }else {
        this.presentToast("Sin conexión al servidor");
      }
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
