import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { CobrosService } from '../../services/cobros.service';
import { OptionsService } from '../../services/options.service';
import { Cobros } from 'src/app/models/cobros';
import { PopItemCobroComponent } from '../../components/cobros/pop-item-cobro/pop-item-cobro.component';
import { DatePipe } from '@angular/common';
import { PopCobrosComponent } from '../../components/cobros/pop-cobros/pop-cobros.component';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.page.html',
  styleUrls: ['./cobros.page.scss'],
})
export class CobrosPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private cobroServ: CobrosService,
    private options: OptionsService,
    private popCtrl: PopoverController,
    private datePipe: DatePipe
  ) { }
  hoy = new Date();
  lista: Cobros[] = [];
  ngOnInit() {
    this.fechaI = this.datePipe.transform(new Date(this.hoy.getFullYear(),this.hoy.getMonth(),1), "yyyy-MM-dd");
    this.getLista();
  }
  volverMenu() {
    this.navCtrl.navigateBack("/tabs/menu");
  }
  loaded  = false;
  time = 1600;
  getLista() {
    this.loaded = false;
    if (!this.options.verificaRol("ADMIN")) {
      this.cobroServ.cobrosUser().subscribe((data: any[]) => {
        this.lista = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    } else {
      this.cobroServ.cobrosUsers().subscribe((data: any[]) => {
        this.lista = data;
        setTimeout(() => {
          this.loaded = true;
        }, this.time);
      });
    }
  }
  listaFiltrada: Cobros[] = [];
  fechaI:string ='';
  fechaF = this.datePipe.transform(new Date(), "yyyy-MM-dd");
  async popCobro(e: Event, cobro: Cobros) {
    const popover = await this.popCtrl.create({
      component: PopItemCobroComponent,
      event: e,
      componentProps: {
        'cobro': cobro
      },
      cssClass: 'custom-popover-cobro',
      mode: 'ios'
    });
    popover.present();
  }
  textoBuscar = '';
  filtrado() {
    if (this.textoBuscar == '' && this.fechaI != '' && this.fechaF != '') {
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return this.fechaF >= fechaCobro && this.fechaI <= fechaCobro;
      });
    } else if (this.textoBuscar == '' && this.fechaF == '' && this.fechaI != '') {
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return fechaCobro >= this.fechaI;
      });
    } else if (this.textoBuscar == '' && this.fechaI == ''  && this.fechaF != '') {
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return fechaCobro <= this.fechaF;
      });
    } else if (this.textoBuscar != '' && this.fechaI == '' && this.fechaF == '') {
      this.listaFiltrada = this.lista.filter((item) => {
        return item.idFactura.nit.toString() == this.textoBuscar;
      });
    } else if (this.textoBuscar != '' && this.fechaI != '' && this.fechaF == '') {
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return item.idFactura.nit.toString() == this.textoBuscar && fechaCobro >= this.fechaI;
      });
    } else if (this.textoBuscar != '' && this.fechaI == '' && this.fechaF != ''){
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return item.idFactura.nit.toString() == this.textoBuscar && fechaCobro <= this.fechaF;
      });
    } else if(this.textoBuscar != '' && this.fechaI != '' && this.fechaF != ''){
      this.listaFiltrada = this.lista.filter((item) => {
        let fechaCobro: string = item.fechaHora.toString().split("T")[0];
        return item.idFactura.nit.toString() == this.textoBuscar && fechaCobro <= this.fechaF && fechaCobro >= this.fechaI;
      });
    } else{
      this.listaFiltrada = this.lista;
    }
  }
  handleChange(event) {
    this.textoBuscar = event.target.value.toLowerCase();
  }
  inputInicial(dato) {
    if (dato == '') {
    } else if (this.fechaI > this.fechaF) {
      this.fechaF = this.fechaI;
    }
  }
  inputFinal(dato) {
    if (dato == '') {
    } else if (this.fechaF < this.fechaI) {
      this.fechaI = this.fechaF;
    }

  }
  async menuPop(e: Event) {
    this.filtrado();
    const popover = await  this.popCtrl.create({
      component: PopCobrosComponent,
      componentProps: {
        'cobros': this.listaFiltrada,
        'fechaI': this.fechaI,
        'fechaF': this.fechaF,
      },
      mode: 'ios',
      cssClass: 'custom-popover',
      event: e
    });
    popover.present();

  }
  verificaRol(){
    if(this.options.verificaRol('ADMIN')){
      return true;
    }
    return false;
  }

}
