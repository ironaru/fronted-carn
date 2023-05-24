import { PopItemMedidorComponent } from '../../components/medidor/pop-item-medidor/pop-item-medidor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedidorPageRoutingModule } from './medidor-routing.module';

import { MedidorPage } from './medidor.page';
import { PopmedidorComponent } from '../../components/medidor/pop-medidor/popmedidor.component';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from './../../pipes/pipes.module';

@NgModule({
  entryComponents: [
    PopmedidorComponent,
    PopItemMedidorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedidorPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [MedidorPage]
})
export class MedidorPageModule {}
