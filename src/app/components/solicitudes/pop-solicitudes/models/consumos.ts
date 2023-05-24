import { Medidor } from '../../../../models/medidor';
export class Consumos{
  id: number;
  fecha: Date;
  lectura: number;
  idMedidor: Medidor;
}
