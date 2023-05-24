import { Pipe, PipeTransform } from '@angular/core';
import { Cobros } from '../models/cobros';

@Pipe({
  name: 'filtroFechaF'
})
export class FiltroFechaFPipe implements PipeTransform {

  transform(array: Cobros[], fecha: string): Cobros[] {
    if (fecha == '') {
      return array;
    }
    return array.filter((item) => {
      let fechaCobro:string = item.fechaHora.toString().split("T")[0];
      return fechaCobro<=fecha;
    });
  }
}
