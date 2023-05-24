import { UsuarioService } from './../../../services/usuario.service';
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
import { Usuario } from '../../../models/usuario';
import { ModalPerfilSocioComponent } from './../modal-perfil-socio/modal-perfil-socio.component';
import { AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';

@Component({
  selector: 'app-pop-item-socio',
  templateUrl: './pop-item-socio.component.html',
  styleUrls: ['./pop-item-socio.component.scss'],
})
export class PopItemSocioComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private popCtrl: PopoverController,
    private usuarioServ: UsuarioService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private rolServ: RolService
    ) { }

  ngOnInit() {}
  @Input() usuario: Usuario;
  roles: Rol[] = [];
  perfil() {
    this.rolServ.getRoles().subscribe((data) => {
      // data.roles.sort((a, b) => a.id - b.id);
      this.roles = data;
      this.modalPerfil();
    });

  }
  async modalPerfil(){
    const modal = await this.modalCtrl.create({
      component: ModalPerfilSocioComponent,
      componentProps: {
        'usuario': this.usuario,
        'roles': this.roles
      },
      mode:'ios'
    });
    await this.popCtrl.dismiss();
    await modal.present();
  }
  async eliminarSocio() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar para eliminar',
      cssClass: 'alerta',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            alert.onDidDismiss();

          },
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            alert.onDidDismiss();
            this.usuarioServ.deleteUser(this.usuario.id).subscribe(async ()=> {
              this.presentToast();
            });
          },
        },
      ],
    });
    this.popCtrl.dismiss();
    await alert.present();

  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Socio eliminado!',
      position: 'middle',
      duration: 3000,
      cssClass: 'custom-toast',
      icon: 'trash',
      mode: 'ios'
    });
    await toast.present();
  }
}
