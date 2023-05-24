import { ConsumosService } from '../../../services/consumos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-consumo',
  templateUrl: './modal-consumo.component.html',
  styleUrls: ['./modal-consumo.component.scss']
})
export class ModalConsumoComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private consumosServ: ConsumosService,
    private toastCtrl: ToastController,
    private datePipe: DatePipe
  ) { }
  @Input() medidor: number;
  consumo: FormGroup;
  ngOnInit() {
    this.fecha();
    this.form();
  }
  fecha(){
    if(this.mesActual.getMonth() == 11){
      this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth(),1);
      this.mesPosterior = new Date(this.mesPosterior.getFullYear()+1,0,0);
    }else{
      this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth(),1);
      this.mesPosterior = new Date(this.mesPosterior.getFullYear(), this.mesActual.getMonth(),0);
    }
    this.min =this.datePipe.transform(this.mesActual,"yyyy-MM-dd");
    this.max =this.datePipe.transform(this.mesPosterior,"yyyy-MM-dd");
  }
  mesActual = new Date();
  mesPosterior = new Date();
  min = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  max = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  today = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  form(){
    this.consumo =this.formB.group({
      lectura: [1,[Validators.min(1),Validators.required]],
      fecha: [this.today,[Validators.required]],
    });
  }
  send():any{
    const medidor = {
      lectura: this.consumo.value.lectura,
      fecha: this.consumo.value.fecha,
      idMedidor:{id: this.medidor}
    }
    return medidor;
  }
  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }


  registrarConsumo(){
    this.consumosServ.postConsumos(this.send()).subscribe((data)=>{
      this.presentToast();
      this.cerrar();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Consumo añadido correctamente!',
      position: 'middle',
      duration: 3000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });
    await toast.present();
  }
}
