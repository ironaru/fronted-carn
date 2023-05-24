import { Comunicados } from './comunicados';
import { Rol } from './rol';
import { Socio } from './socio';
export class Usuario {
  id: number;
  usuario: string;
  clave: string;
  socio: Socio;
  roles: Rol[];
  comunicados: Comunicados[];

}
