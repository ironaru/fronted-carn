import { PopTarifasComponent } from './../../components/tarifas/pop-tarifas/pop-tarifas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarifasPageRoutingModule } from './tarifas-routing.module';

import { TarifasPage } from './tarifas.page';

@NgModule({
  entryComponents: [
    PopTarifasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarifasPageRoutingModule
  ],
  declarations: [TarifasPage]
})
export class TarifasPageModule {}
