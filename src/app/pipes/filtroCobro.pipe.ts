import { Pipe, PipeTransform } from '@angular/core';
import { Cobros } from '../models/cobros';

@Pipe({
  name: 'filtroCobro'
})
export class FiltroCobroPipe implements PipeTransform {

  transform(array: Cobros[], texto: string): Cobros[] {
    if (texto == '') {
      return array;
    }
    texto = texto.toLowerCase();
    return array.filter((item) => {
      return item.idFactura.nit.toString().toLowerCase() == texto;
    });
  }
}
