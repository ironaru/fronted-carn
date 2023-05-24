import { TarifasService } from './../../../services/tarifas.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-tarifa',
  templateUrl: './modal-tarifa.component.html',
  styleUrls: ['./modal-tarifa.component.scss']
})
export class ModalTarifaComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private tarifaS: TarifasService,
    private toastCtrl: ToastController,
    private datePipe: DatePipe
    ) { }

  form : FormGroup;
  ngOnInit() {
    this.fecha();
    this.tarifaForm();
  }
  fecha(){
    this.min = this.datePipe.transform(new Date(this.today.getFullYear(),0,1),"yyyy-MM-dd");
    this.max = this.datePipe.transform(new Date(this.today.getFullYear()+1,0,0),"yyyy-MM-dd");
  }
  min = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  max = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  today = new Date();
  tarifaForm(){
    this.form = this.formB.group({
      fechaInic: [this.min,[Validators.required]],
      consumoMax: [1, [Validators.min(1), Validators.required]],
      costoUnit: [1, [Validators.min(1),Validators.required]],
    });
  }

  cancelar(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  guardar(){
    return this.tarifaS.saveTarifas(this.form.value).subscribe((data)=>{
      this.presentToast("Tarifa registrada!");
      this.modalCtrl.dismiss();
    },(error)=>{
      this.presentToast("Ocurrio un error!");
    });
  }
  async presentToast( mensaje:string) {
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
