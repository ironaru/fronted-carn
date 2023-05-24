import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../models/usuario';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(array: any[], texto: string): any[] {
    if (texto == '') {
      return array;
    }
    texto = texto.toLowerCase();
    return array.filter((item: Usuario) => {

      return item.socio.ci.toString().toLowerCase().includes(texto);
    });
  }
}
