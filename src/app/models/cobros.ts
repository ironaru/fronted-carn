import { Socio } from './socio';
import { Multas } from './multas';
import { Facturas } from './facturas';
export class Cobros{
  id: number;
  fechaHora: Date;
  monto: number;
  ref: string;
  tipo: number;
  socios: Socio;
  idMulta: Multas
  idFactura: Facturas
}
