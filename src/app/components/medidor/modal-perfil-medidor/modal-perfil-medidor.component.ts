import { OptionsService } from './../../../services/options.service';
import { Subscription } from 'rxjs';
import { MedidorService } from '../../../services/medidor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medidor } from '../../../models/medidor';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal-perfil-medidor',
  templateUrl: './modal-perfil-medidor.component.html',
  styleUrls: ['./modal-perfil-medidor.component.scss'],
})
export class ModalPerfilMedidorComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private medidorS: MedidorService,
    private options: OptionsService,
    private toastCtrl: ToastController
    ) {}
  @Input() medidor: Medidor;
  // data: any;
  medidorForm: FormGroup;
  // socio: any;
  subscription : Subscription;
  ngOnInit() {
    this.form();
    this.medidorForm.disable();
  }
  form() {
    this.medidorForm = this.formB.group({
      id_socio: [this.medidor?.idSocio.id,Validators.required],
      id: [this.medidor?.id,Validators.required],
      serial: [this.medidor?.serial,Validators.required],
      marca: [this.medidor?.marca,Validators.required],
      regInic: [this.medidor?.regInic,Validators.required],
      fechaInst: [this.medidor?.fechaInst,Validators.required],
    });

  }
  send(){
    const send ={
      id: this.medidorForm.value.id,
      serial: this.medidorForm.value.serial,
      marca: this.medidorForm.value.marca,
      regInic: this.medidorForm.value.regInic,
      fechaInst: this.medidorForm.value.fechaInst,
      idSocio: {id: this.medidorForm.value.id_socio},
    }
    return send;
  }
  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  verificaRol(){
    if(!this.options.verificaRol('ADMIN')){
      return false;
    }
    else{
      return true;
    }
  }

  iedit = 'create';
  mensaje: any;
  editar() {
    if (this.iedit == 'create') {
      this.medidorForm.enable();
      this.iedit = 'checkmark-circle';
    }else{

      this.medidorS.putMedidor(this.send()).subscribe((data: any)=>{
        this.mensaje = data;
        this.medidorForm.disable();
        this.iedit = 'create';
        this.mensajes();
      });
    }
  }
  mensajes(){
    if(this.mensaje.message == 'OK'){
      this.medidorForm.disable();
      this.iedit = 'create';
      this.presentToast("Medidor actualizado!");
    }else{
      this.presentToast(this.mensaje.message);
    }
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
