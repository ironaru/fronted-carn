import { Subscription, Observable } from 'rxjs';
import { ConsumosService } from '../../../services/consumos.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { Cobros } from '../../../models/cobros';
import { Multas } from '../../../models/multas';
import { Facturas } from '../../../models/facturas';
import { Consumos } from '../../../models/consumos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private consumoServ: ConsumosService,
    private toastCtrl: ToastController,
    private formB: FormBuilder
  ) { }
  ngOnInit() {
    this.form();
    this.services();
    this.multa.descripcion ='';
    this.multa.monto = 0;
  }
  @Input() consumo: Consumos;
  factura: Facturas;
  multa: Multas = new Multas();
  cobro: Cobros = new Cobros();
  multaForm: FormGroup;
  @Input() tarifa: any;
  editar = false;
  edit(){
    this.editar = true;
  }
  save(){
    if(this.multaForm.value.monto > 0 && this.multaForm.value.descripcion == ''){
      this.presentToast('Falta el detalle de la multa');

    }else{
      this.editar = false;
      this.multa.monto = this.multaForm.value.monto;
      this.multa.descripcion = this.multaForm.value.descripcion;
      this.cobro.idMulta = this.multa;
    }
  }
  total(): number {
    const montoFatura = this.factura?.monto;
    const montoMulta = this.multa?.monto;
    this.cobro.monto = montoFatura + montoMulta;
    return montoFatura + montoMulta;
  }
  form(){
    this.multaForm = this.formB.group({
      descripcion: [],
      monto: [0, [Validators.min(0), Validators.required]],
    });
  }
  fecha = new Date().toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  cerrar() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  services() {

    const periodo = new Date(this.consumo.fecha).toLocaleDateString(
      'es-BO',
      { month: 'long', year: 'numeric' }
    );
    const factura = {
      periodo: periodo,
    };
    this.consumoServ.generarFactura(this.consumo.id, factura).subscribe((data) => {
      this.cobro.idFactura = data;

      this.factura = data;
    });
  }

  descargarPdf() {
    const data = document.getElementById('htmlData');
    let html = htmlToPdfmake(data.innerHTML);
    const documentDefinition = {
      // a string or { width: number, height: number }
      pageSize: 'A5',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [40, 60, 40, 60],
      content: html,
    };
    pdfMake
      .createPdf(documentDefinition)
      .download('factura-' + this.factura.id + '.pdf');
  }
  facturar() {
    this.consumoServ.confirmarFactura(this.cobro).subscribe((data) => {
      this.descargarPdf();
      this.modalCtrl.dismiss();
      this.presentToast("Facturado!")
    });
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 2000,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios',
    });
    await toast.present();
  }
}
