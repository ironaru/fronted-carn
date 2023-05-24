import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: FormGroup;


  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.form();
  }

  public form(){
    this.user = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  visible = 'bi bi-eye-fill';
  type = 'password';
  isVisible() {
    if (this.type == 'password') {
      this.visible = 'bi bi-eye-slash-fill';
      this.type = 'text';
    } else {
      this.visible = 'bi bi-eye-fill';
      this.type = 'password';
    }
  }

  public login(): void {
    this.usuarioService.generateToken(this.user.value).subscribe((data)=>{
      this.usuarioService.setToken(data.token);
      this.usuarioService.actualUsuario().subscribe((user: any)=>{
        this.form();
        this.usuarioService.setUser(user);
        this.navCtrl.navigateRoot("/tabs/main");
      });
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
      duration: 1500,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });
    toast.present();
  }
  inicio(){
    this.navCtrl.navigateBack("/index");
  }
}
