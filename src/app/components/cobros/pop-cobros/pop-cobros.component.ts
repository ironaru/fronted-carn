import { Component, Input, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { Cobros } from '../../../models/cobros';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-pop-cobros',
  templateUrl: './pop-cobros.component.html',
  styleUrls: ['./pop-cobros.component.scss'],
})
export class PopCobrosComponent implements OnInit {
  constructor(
    private popCtrl: PopoverController,
    private toastCtrl: ToastController
  ) {}
  @Input() cobros: Cobros[] = [];
  ngOnInit() {

  }
  @Input() fechaI: Date;
  @Input() fechaF: Date;
  generaReporte() {
    if (this.cobros.length > 0) {
      this.descargarPdf();
      this.popCtrl.dismiss();
    } else {
      this.presentToast("No hay cobros en la lista");
      this.popCtrl.dismiss();
    }
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      duration: 1800,
      cssClass: 'custom-toast',
      icon: 'checkmark-circle',
      mode: 'ios'
    });

    await toast.present();
  }

  totalCobro(): number{
    let total: number = 0;
    this.cobros.forEach((item)=>{
      total += item.monto
    });
    return total;
  }
  descargarPdf() {
    const data = document.getElementById('htmlData');
    let html = htmlToPdfmake(data.innerHTML);
    const documentDefinition = {
      // a string or { width: number, height: number }
      pageSize: 'A5',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'landscape',

      // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
      pageMargins: [40, 60, 40, 60],
      content: html,
    };
    pdfMake
      .createPdf(documentDefinition)
      .download('reporte' + '.pdf');
  }
}
