import { UsuarioService } from 'src/app/services/usuario.service';

import { RolService } from '../../../services/rol.service';

import {
  ModalController,
  IonButton,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Socio } from 'src/app/models/socio';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { DomSanitizer } from '@angular/platform-browser';
import { PopmedidorComponent } from '../../medidor/pop-medidor/popmedidor.component';
import { Rol } from '../../../models/rol';
import { OptionsService } from '../../../services/options.service';
import { Medidor } from '../../../models/medidor';
import { MedidorService } from '../../../services/medidor.service';
import { ViewWillEnter } from '@ionic/angular';
import { PopItemMedidorComponent } from '../../medidor/pop-item-medidor/pop-item-medidor.component';

@Component({
  selector: 'app-modal-perfil-socio',
  templateUrl: './modal-perfil-socio.component.html',
  styleUrls: ['./modal-perfil-socio.component.scss'],
})
export class ModalPerfilSocioComponent implements OnInit,ViewWillEnter {
  constructor(
    private modalCtrl: ModalController,
    private usuarioServ: UsuarioService,
    private formB: FormBuilder,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private options: OptionsService,
    private medidorServ: MedidorService
  ) {}
  ionViewWillEnter(){
    this.getMedidores();
  }
  public previsualizacion: string;
  public archivos: any[] = [];
  subscription: Subscription;
  public loading: boolean;
  @Input() usuario: Usuario;
  @Input() roles: Rol[] = [];
  form: FormGroup;

  ngOnInit() {
    this.data();
    this.subscription = this.medidorServ._refresh$.subscribe(()=>{
      this.getMedidores();
    })
    this.formulario();
    this.form.disable();
  }
  medidores: Medidor[] = [];
  verificaRol():boolean{
    if(this.options.verificaRol('ADMIN')){
      return true;
    }
    return false;
  }
  getMedidores(){
    this.medidorServ.medidorSocio(this.usuario.socio.id).subscribe((data)=>{
      this.medidores = data;
    });
  }
  data() {

    if (this.usuario.socio.foto == null || this.usuario.socio.foto == '') {
      this.previsualizacion = 'assets/images/avatar.svg';
    } else {
      this.previsualizacion = this.usuario.socio.foto;
    }
  }
  cerrar() {
    this.subscription.unsubscribe();
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  fotoDisabled = true;
  edit = false;
  iedit = 'create';
  user: Usuario = new Usuario();
  mensaje: any;
  formulario() {
    this.form = this.formB.group({
      nombres: [this.usuario.socio.nombres, Validators.required],
      apellidos: [this.usuario.socio.apellidos, Validators.required],
      correo: [this.usuario.socio.correo, Validators.required],
      celular: [this.usuario.socio.celular, Validators.required],
      fechaNac: [this.usuario.socio.fechaNac, Validators.required],
      fechaReg: [this.usuario.socio.fechaReg, Validators.required],
      activo: [this.usuario?.socio.activo, Validators.required],
      direccion: [this.usuario?.socio.direccion],
      roles: [this.usuario.roles, Validators.required],
      ci: [this.usuario.socio.ci, Validators.required],
    });
  }

  //opcion de editar
  editar() {
    if (!this.edit) {
      this.fotoDisabled = false;
      this.form.enable();
      this.edit = true;
      this.iedit = 'checkmark-circle';
    } else {
      this.usuario.socio.celular = this.form.value.celular;
      this.usuario.socio.activo = this.form.value.activo;
      this.usuario.socio.fechaNac = this.form.value.fechaNac;
      this.usuario.socio.correo = this.form.value.correo;
      this.usuario.socio.nombres = this.form.value.nombres;
      this.usuario.socio.apellidos = this.form.value.apellidos;
      this.usuario.socio.direccion = this.form.value.direccion;
      this.usuario.roles = this.form.value.roles;
      this.usuario.socio.foto = this.previsualizacion;
      this.usuarioServ.editarUsuario(this.usuario).subscribe(
        (data: any) => {
          this.mensaje = data;
          this.mensajes();
        },
        (error: any) => {
          if (error.status == 401) {
            this.presentToast(error.error.message);
          } else {
            this.presentToast('Sin conexión al servidor');
          }
        }
      );
    }
  }
  async popMedidor(e:Event,medidor: Medidor) {
    const popover = await this.popoverCtrl.create({
      component: PopItemMedidorComponent,
      event: e,
      componentProps: {
        'medidor': medidor
      },
      mode:'ios',
      cssClass: 'custom-popover',
    });
    popover.present();
  }
  mensajes() {
    if (this.mensaje.message != 'OK') {
      this.presentToast(this.mensaje.message);
    } else {
      this.form.disable();
      this.edit = false;
      this.fotoDisabled = true;
      this.iedit = 'create';
      this.presentToast('Socio actualizado!');
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 1000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios',
    });
    toast.present();
  }
  //compara los roles para mostrar en ion-select
  compareWithFn = (o1: any, o2: any) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  compareWith = this.compareWithFn;

  //archivo tipo .png/.jpeg/.jpg
  capturarFile(event: any) {
    const imagen = event.target.files[0];
    this.archivos.push(imagen);
    this.extraerBase64(imagen).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.archivos.push(imagen);
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        // const unsafeImg = window.URL.createObjectURL($event);
        // const imagen = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
    });
  async menuPop(e: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopmedidorComponent,
      cssClass: 'custom-popover',
      event: e,
      translucent: true,
      componentProps: {
        socio: this.usuario.socio,
      },
      mode: 'ios',
    });
    await popover.present();
  }
}
