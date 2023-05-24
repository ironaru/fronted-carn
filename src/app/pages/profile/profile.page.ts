/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Subscription } from 'rxjs';
import { ModalPasswordComponent } from '../../components/menu/modal-password/modal-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usuarioServ: UsuarioService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.getUsuario();
    this.form();
    this.data();
  }
  data() {
    if (this.usuario.socio.foto == null || this.usuario.socio.foto == '') {
      this.previsualizacion = 'assets/images/avatar.svg';
    } else {
      this.previsualizacion = this.usuario.socio.foto;
    }
  }
  previsualizacion: string;
  archivos: any[] = [];
  usuarioForm: FormGroup;
  usuario: Usuario;
  suscription: Subscription;
  form(){
    this.usuarioForm = this.formBuilder.group({
      correo: [this.usuario.socio.correo,[Validators.required]],
      nombres: [this.usuario.socio.nombres,[Validators.required]],
      apellidos: [this.usuario.socio.apellidos,[Validators.required]],
      fechaNac: [this.usuario.socio.fechaNac,[Validators.required]],
      direccion: [this.usuario.socio.direccion,[Validators.required]],
    });
  }
  send(){
    this.usuario.socio.foto = this.previsualizacion;
  }
  getUsuario(){
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }
  guardar(){

  }

  async password(){
    const modal = await this.modalCtrl.create({
      component: ModalPasswordComponent,
      cssClass:'modal1',
      swipeToClose: false,
    });
    await modal.present();
  }
  volver(){
    this.navCtrl.navigateBack("tabs/menu");
  }
  capturarFile(event: any) {
    const imagen = event.target.files[0];
    this.archivos.push(imagen);
    this.extraerBase64(imagen).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      this.usuario.socio.foto = this.previsualizacion;
      this.usuarioServ.editUsuario(this.usuario).subscribe((data)=>{
        this.usuarioServ.setUser(data);
      });
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
}
