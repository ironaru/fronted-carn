import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMedidor'
})
export class FiltroMedidorPipe implements PipeTransform {

  transform(array: any[], texto: string): any[] {
    if (texto === '') {
      return array;
    }
    texto = texto.toLowerCase();
    return array.filter((item) => {
      return item.serial.toLowerCase().includes(texto);
    });
  }

}
