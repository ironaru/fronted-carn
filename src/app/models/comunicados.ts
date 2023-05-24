import { Usuario } from 'src/app/models/usuario';
export class Comunicados{
  id: number;
  descripcion: string;
  fechaInicio: Date;
  vigencia: number;
  user: Usuario = new Usuario();

}
