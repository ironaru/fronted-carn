import { Component, Input, OnInit } from '@angular/core';
import { Cobros } from 'src/app/models/cobros';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-item-cobro',
  templateUrl: './modal-item-cobro.component.html',
  styleUrls: ['./modal-item-cobro.component.scss']
})
export class ModalItemCobroComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.fechaHora();
  }
  @Input() cobro: Cobros;
  cerrar(){
    this.modalCtrl.dismiss();
  }
  fecha: string;
  fechaHora() {
    this.fecha = new Date(this.cobro.fechaHora).toLocaleDateString('es-BO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  tarifa(): number {
    const total: number = this.cobro?.monto;
    const factura: number = this.cobro?.idFactura.monto;
    const lectura: number = this.cobro.idFactura.idConsumo.lectura;
    if(this.cobro?.idMulta != null){
      const multa= this.cobro.idMulta.monto;
      return (total-multa)/lectura;
    }else
      return factura/lectura;
  }

}
