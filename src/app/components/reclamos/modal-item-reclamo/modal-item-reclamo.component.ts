import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Reclamos } from '../../../models/reclamos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionsService } from '../../../services/options.service';
import { ReclamosService } from '../../../services/reclamos.service';

@Component({
  selector: 'app-modal-item-reclamo',
  templateUrl: './modal-item-reclamo.component.html',
  styleUrls: ['./modal-item-reclamo.component.scss']
})
export class ModalItemReclamoComponent implements OnInit, OnDestroy {
  @Input() reclamo : Reclamos;
  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private options: OptionsService,
    private reclamoServ: ReclamosService
  ) { }
  ngOnInit() {
    this.data();
    this.form();
  }
  ngOnDestroy(){

  }
  visible = false;
  cerrar(){
    this.modalCtrl.dismiss();
  }
  data(){
    if(this.reclamo?.atendido){
      this.visible = true;
    }
    if(this.reclamo?.fechaAtencion ==  null){
      this.reclamo.fechaAtencion = new Date();
    }
  }
  visibleForm():Boolean {
    if(this.options.verificaRol('ADMIN')){
      return true;
    }
    return false;
  }

  reclamoForm: FormGroup;
  form(){
    this.reclamoForm = this.formB.group({
      id: [this.reclamo?.id],
      resultado: [this.reclamo?.resultado, Validators.min(30)]
    });
  }
  iedit = 'create';
  edit = false;
  editar() {
    if (!this.edit) {
      this.edit = true;
      this.iedit = 'checkmark-circle';
    } else {
      this.reclamo.resultado = this.reclamoForm.value.resultado;
      this.reclamoServ.responderReclamo(this.reclamo).subscribe(() => {
        this.edit = false;
        this.iedit = 'create';
      });

    }
  }
}
