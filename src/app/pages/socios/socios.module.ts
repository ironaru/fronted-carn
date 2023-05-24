import { PipesModule } from './../../pipes/pipes.module';
import { PopsocioComponent } from '../../components/socio/pop-socio/popsocio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SociosPageRoutingModule } from './socios-routing.module';

import { SociosPage } from './socios.page';

@NgModule({
  entryComponents: [
    PopsocioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SociosPageRoutingModule,
    PipesModule
  ],
  declarations: [SociosPage]
})
export class SociosPageModule {}
