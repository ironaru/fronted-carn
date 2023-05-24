import { Component, Input, OnInit } from '@angular/core';
import { Solicitudes } from '../../../models/solicitudes';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-modal-item-solicitud',
  templateUrl: './modal-item-solicitud.component.html',
  styleUrls: ['./modal-item-solicitud.component.scss']
})
export class ModalItemSolicitudComponent implements OnInit {
  @Input() solicitud: Solicitudes;
  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private solicitudServ: SolicitudesService,
    private options: OptionsService
  ) { }

  ngOnInit() {
    console.log(this.solicitud);

    this.data();
    this.form();
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
  solicitudForm: FormGroup;
  form(){
    this.solicitudForm = this.formB.group({
      id: [this.solicitud?.id,Validators.required],
      resultado: [this.solicitud?.resultado, Validators.required]
    });
  }
  visible = false;
  data(){
    if(this.solicitud?.atendido){
      this.visible = true;
    }
    if(this.solicitud?.fechaAtencion ==  null){
      this.solicitud.fechaAtencion = new Date();
    }
  }
  visibleForm():Boolean {
    if(this.options.verificaRol('ADMIN')){
      return true;
    }
    return false;
  }
  iedit = 'create';
  edit = false;
  editar() {
    this.solicitud.resultado = this.solicitudForm.value.resultado;
    if (!this.edit) {
      this.edit = true;
      this.iedit = 'checkmark-circle';
    } else {

      this.solicitudServ.responderSolicitud(this.solicitud).subscribe(() => {
        this.edit = false;
        this.iedit = 'create';
      });

    }
  }
}
