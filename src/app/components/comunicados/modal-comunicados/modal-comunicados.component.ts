import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comunicados } from '../../../models/comunicados';
import { ComunicadosService } from '../../../services/comunicados.service';
import { Usuario } from '../../../models/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-comunicados',
  templateUrl: './modal-comunicados.component.html',
  styleUrls: ['./modal-comunicados.component.scss']
})
export class ModalComunicadosComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private comunicadoServ: ComunicadosService,
    private toastCtrl: ToastController,
    private datePipe: DatePipe
    ) { }

  ngOnInit() {
    this.form();
  }
  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  today = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  comunicadoForm!: FormGroup;
  comunicado: Comunicados = new Comunicados();
  form(){
    this.comunicadoForm = this.formB.group({
      descripcion: ["", Validators.required],
      fechaInicio: [this.today, Validators.required],
      vigencia: [1, Validators.required]
    });
  }

  send(){
    const user: Usuario =  JSON.parse( localStorage.getItem('user'));
    this.comunicado.id = 0;
    this.comunicado.descripcion = this.comunicadoForm.value.descripcion;
    this.comunicado.fechaInicio = this.comunicadoForm.value.fechaInicio;
    this.comunicado.vigencia = this.comunicadoForm.value.vigencia;
    this.comunicado.user.id = user.id;
  }
  confirmar(){
    this.send();
    this.comunicadoServ.subirComunicados(this.comunicado).subscribe(() =>{
      this.presentToast("Comunicado agregado correctamente!");
      this.cerrar();
    })
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
