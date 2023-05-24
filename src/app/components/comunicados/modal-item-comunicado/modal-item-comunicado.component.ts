import { Component, Input, OnInit } from '@angular/core';
import { Comunicados } from '../../../models/comunicados';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicadosService } from '../../../services/comunicados.service';
import { ModalController } from '@ionic/angular';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-modal-item-comunicado',
  templateUrl: './modal-item-comunicado.component.html',
  styleUrls: ['./modal-item-comunicado.component.scss']
})
export class ModalItemComunicadoComponent implements OnInit {
  @Input() comunicado: Comunicados;
  constructor(
    private formB: FormBuilder,
    private comunicadoServ: ComunicadosService,
    private modalCtrl: ModalController,
    private options: OptionsService
  ) { }

  ngOnInit() {
    this.form();
  }
  comunicadoForm!: FormGroup;
  today = new Date();
  lectura = true;
  form(){
    this.comunicadoForm = this.formB.group({
      id: [this.comunicado.id],
      descripcion: [this.comunicado.descripcion, [Validators.required]],
      fechaInicio: [this.comunicado.fechaInicio, [Validators.required]],
      vigencia: [this.comunicado.vigencia, [Validators.min(1) ,Validators.required]],
    });
  }
  iedit = 'create';
  editar(){
    if(this.lectura){
      this.lectura = !this.lectura;
      this.iedit  = 'checkmark-circle';
    }else {
      this.lectura = !this.lectura;
      this.iedit = 'create';
      this.comunicadoServ.actualizarComunicados(this.comunicadoForm.value).subscribe();
    }
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
  disabled(): boolean{
    let ban = false;
    if(this.iedit == 'create'){

    }else if(this.iedit == 'checkmark-circle'){
      if(!this.comunicadoForm.valid){
        ban = !ban;
      }
    }
    return ban;
  }
  verificaRol():boolean{
    if(!this.options.verificaRol('ADMIN')){
      return false;
    }
    return true;

  }
}
