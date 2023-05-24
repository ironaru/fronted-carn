import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComunicadosService } from '../../services/comunicados.service';
import { Comunicados } from '../../models/comunicados';
import { Tarifa } from '../../models/tarifa';
import { TarifasService } from '../../services/tarifas.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private comunicadoServ: ComunicadosService,
    private tarifaServ: TarifasService
    ) { }
  comunicados: Comunicados[]=[];
  tarifas: Tarifa[] = [];
  ngOnInit() {
    this.getComunicados();
    this.getTarifas();
  }
  inicioSesion(){
    this.navCtrl.navigateForward("/login");
  }
  getComunicados(){
    this.comunicadoServ.obtenerComunicados().subscribe((data)=>{
      this.comunicados = data;
    });
  }
  getTarifas(){
    this.tarifaServ.getTarifas$().subscribe((data)=>{
      this.tarifas = data;
    });
  }
}
