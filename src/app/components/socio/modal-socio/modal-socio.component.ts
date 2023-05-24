import { SwiperOptions } from './../../../../../node_modules/swiper/types/swiper-options.d';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Swiper, Zoom, EffectCube} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { IonContent } from '@ionic/angular';
import { Usuario } from '../../../models/usuario';
import { DatePipe } from '@angular/common';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectCube]);
@Component({
  selector: 'app-modal-socio',
  templateUrl: './modal-socio.component.html',
  styleUrls: ['./modal-socio.component.scss'],
})
export class ModalSocioComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private UsuarioServ: UsuarioService,
    private datePipe: DatePipe,
    private toastCtrl: ToastController
  ) {}
  ngOnInit() {
    this.fechaMax=this.datePipe.transform(new Date(this.today-this.year),"yyyy-MM-dd");

    this.form();
      this.previsualizacion= "assets/images/avatar.svg";
  }
  lock = false;
  cerrar() {
    this.modalCtrl.dismiss();
  }

  previsualizacion: string = "";
  public archivos: any[] = [];
  public loading: boolean;
  usuarioForm: FormGroup;
  usuario: any ;
  today = new Date().getTime();
  year = 18*365*24*60*60*1000;
  fechaMax = this.datePipe.transform(new Date(),"yyyy-MM-dd");
  form() {
    this.usuarioForm = this.formBuilder.group({
      correo: ['', [Validators.required]],
      foto: [this.previsualizacion],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required,Validators.minLength(8)]],
      fechaNac: [this.fechaMax,[Validators.required]],
      activo: [false],
      celular: ['', [Validators.required,Validators.minLength(7)]],
      ci: ['', [Validators.required,Validators.minLength(7)]],
      direccion: [''],
    });
  }

  send(){
    this.usuario = {
      usuario: this.user,
      clave:  this.usuarioForm.value.celular,
      socio:{
        ci: this.usuarioForm.value.ci,
        nombres:  this.usuarioForm.value.nombres,
        apellidos: this.usuarioForm.value.apellidos,
        direccion: this.usuarioForm.value.direccion,
        activo: this.usuarioForm.value.activo,
        celular: this.usuarioForm.value.celular,
        foto: this.usuarioForm.value.foto,
        fechaNac: this.usuarioForm.value.fechaNac,
        correo: this.usuarioForm.value.correo,
      }
    };
    this.registerUser();
  }
  capturarFile(event: any) {
    const imagen = event.target.files[0];
    this.archivos.push(imagen);
    this.extraerBase64(imagen).then((imagen: any) => {
      this.previsualizacion= imagen.base;
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

  registerUser() {
    this.UsuarioServ.registerUser(this.usuario).subscribe((data: any) => {
      if(data?.message !== undefined) {
        this.presentToast(data.message);
      }else{
        this.presentToast("Usuario registrado!");
        this.modalCtrl.dismiss();
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
      duration: 1000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });
    toast.present();
  }
  user = '';
  input(dato){
    if(dato == ''){
      this.user = dato;
    }else{
      this.user = 's'+dato;
    }
  }


}
