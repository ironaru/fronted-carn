import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltroMedidorPipe } from './filtroMedidor.pipe';
import { FiltroCobroPipe } from './filtroCobro.pipe';
import { FiltroFechaIPipe } from './filtroFechaI.pipe';
import { FiltroFechaFPipe } from './filtroFechaF.pipe';



@NgModule({
  declarations: [
      FiltroPipe,
      FiltroMedidorPipe,
      FiltroCobroPipe,
      FiltroFechaIPipe,
      FiltroFechaFPipe
   ],
  imports: [
    CommonModule
  ],
  exports:[
    FiltroPipe,
    FiltroMedidorPipe,
    FiltroCobroPipe,
    FiltroFechaIPipe,
    FiltroFechaFPipe
  ]
})
export class PipesModule { }
