import { ConsumosService } from './../../../services/consumos.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Cobros } from 'src/app/models/cobros';

@Component({
  selector: 'app-modal-cobros',
  templateUrl: './modal-cobros.component.html',
  styleUrls: ['./modal-cobros.component.scss']
})
export class ModalCobrosComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private consumoServ: ConsumosService) { }
  @Input() medidor: number;
  ngOnInit() {
    this.obtenerCobros();
  }
  list: Cobros[] = [];

  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  obtenerCobros(){
    this.consumoServ.getCobros(this.medidor).subscribe((data)=>{
      this.list = data;
      console.log(this.list);

    });
  }



}
