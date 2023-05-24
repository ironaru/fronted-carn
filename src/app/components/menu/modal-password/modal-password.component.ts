import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.scss']
})
export class ModalPasswordComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private formB: FormBuilder,
    private usuarioServ: UsuarioService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.form();
  }
  cerrar(){
    this.modalCtrl.dismiss();
  }
  password: FormGroup;
  validarContra(): boolean  {
    if(this.password.value.nueva == this.password.value.repetida){
      return true;
    }
    return false;
  }
  form(){
    this.password = this.formB.group({
      actual: ["", [Validators.minLength(8), Validators.required]],
      nueva: ["", [Validators.minLength(8), Validators.required]],
      repetida: ["", [Validators.minLength(8), Validators.required]],
    });
  }
  send(){
    if(this.validarContra()){
      this.usuarioServ.cambiarContra(this.password.value).subscribe((data)=>{
        if(data === true){
          this.usuarioServ.actualUsuario().subscribe((user: any)=>{
            this.form();
            this.usuarioServ.setUser(user);
            this.cerrar();
            this.presentToast("Contraseña cambiada correctamente!")
          });

        }else{
          this.presentToast("Contraseña actual incorrecta!")
        }
      },(error)=>{
        this.presentToast("Sin conexión al servidor")
      });
    }else{
      this.presentToast("Contraseña nueva no se repite!")
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 2000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });

    await toast.present();
  }
}
