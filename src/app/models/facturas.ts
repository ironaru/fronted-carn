import { Consumos } from "./consumos";

export class Facturas {
    id: number;
    nit: number;
    periodo: string;
    monto: number;
    estado: boolean;
    razonSocial: string;
    idConsumo: Consumos
}
