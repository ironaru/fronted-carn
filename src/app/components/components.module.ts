import { ModalCobrosComponent } from './consumo-medidor/modal-cobros/modal-cobros.component';
import { FacturaComponent } from './consumo-medidor/factura/factura.component';
import { ModalConsumoComponent } from './consumo-medidor/modal-consumo/modal-consumo.component';
import { ConsumosComponent } from './consumo-medidor/consumos/consumos.component';
import { ModalTarifaComponent } from './tarifas/modal-tarifa/modal-tarifa.component';
import { ModalPerfilMedidorComponent } from './medidor/modal-perfil-medidor/modal-perfil-medidor.component';
import { ModalPerfilSocioComponent } from './socio/modal-perfil-socio/modal-perfil-socio.component';
import { PopItemSocioComponent } from './socio/pop-item-socio/pop-item-socio.component';
import { ModalSocioComponent } from './socio/modal-socio/modal-socio.component';
import { PopItemMedidorComponent } from './medidor/pop-item-medidor/pop-item-medidor.component';
import { ModalMedidorComponent } from './medidor/modal-medidor/modal-medidor.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PopmedidorComponent } from './medidor/pop-medidor/popmedidor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopsocioComponent } from './socio/pop-socio/popsocio.component';
import { PopTarifasComponent } from './tarifas/pop-tarifas/pop-tarifas.component';
import { PopConsumoComponent } from './consumo-medidor/pop-consumo/pop-consumo.component';
import { SwiperModule } from 'swiper/angular';
import { PopComunicadosComponent } from './comunicados/pop-comunicados/pop-comunicados.component';
import { ModalComunicadosComponent } from './comunicados/modal-comunicados/modal-comunicados.component';
import { PopItemComunicadoComponent } from './comunicados/pop-item-comunicado/pop-item-comunicado.component';
import { ModalItemComunicadoComponent } from './comunicados/modal-item-comunicado/modal-item-comunicado.component';
import { PopReclamosComponent } from './reclamos/pop-reclamos/pop-reclamos.component';
import { ModalReclamosComponent } from './reclamos/modal-reclamos/modal-reclamos.component';
import { PopItemReclamoComponent } from './reclamos/pop-item-reclamo/pop-item-reclamo.component';
import { ModalItemReclamoComponent } from './reclamos/modal-item-reclamo/modal-item-reclamo.component';
import { PopSolicitudesComponent } from './solicitudes/pop-solicitudes/pop-solicitudes.component';
import { PopItemSolicitudComponent } from './solicitudes/pop-item-solicitud/pop-item-solicitud.component';
import { ModalSolicitudesComponent } from './solicitudes/modal-solicitudes/modal-solicitudes.component';
import { ModalItemSolicitudComponent } from './solicitudes/modal-item-solicitud/modal-item-solicitud.component';
import { ModalPasswordComponent } from './menu/modal-password/modal-password.component';
import { PopItemConsumoComponent } from './consumo-medidor/pop-item-consumo/pop-item-consumo.component';
import { PopItemCobroComponent } from './cobros/pop-item-cobro/pop-item-cobro.component';
import { ModalItemCobroComponent } from './cobros/modal-item-cobro/modal-item-cobro.component';
import { PopCobrosComponent } from './cobros/pop-cobros/pop-cobros.component';
@NgModule({
    declarations: [
        PopmedidorComponent,
        ModalMedidorComponent,
        PopItemMedidorComponent,
        PopsocioComponent,
        ModalSocioComponent,
        PopItemSocioComponent,
        ModalPerfilSocioComponent,
        ModalPerfilMedidorComponent,
        PopTarifasComponent,
        ModalTarifaComponent,
        ConsumosComponent,
        PopConsumoComponent,
        ModalConsumoComponent,
        FacturaComponent,
        ModalCobrosComponent,
        PopComunicadosComponent,
        ModalComunicadosComponent,
        PopItemComunicadoComponent,
        ModalItemComunicadoComponent,
        PopReclamosComponent,
        ModalReclamosComponent,
        PopItemReclamoComponent,
        ModalItemReclamoComponent,
        PopSolicitudesComponent,
        PopItemSolicitudComponent,
        ModalSolicitudesComponent,
        ModalItemSolicitudComponent,
        ModalPasswordComponent,
        PopItemConsumoComponent,
        PopItemCobroComponent,
        ModalItemCobroComponent,
        PopCobrosComponent
    ],
    exports: [
        PopmedidorComponent,
        ModalMedidorComponent,
        PopItemMedidorComponent,
        PopItemSocioComponent,
        ModalSocioComponent,
        ModalPerfilSocioComponent,
        ModalTarifaComponent,
        PopTarifasComponent,
        PopConsumoComponent,
        ModalConsumoComponent,
        FacturaComponent,
        ModalCobrosComponent,
        PopComunicadosComponent,
        ModalComunicadosComponent,
        PopItemComunicadoComponent,
        ModalItemComunicadoComponent,
        PopReclamosComponent,
        ModalReclamosComponent,
        PopItemReclamoComponent,
        ModalItemReclamoComponent,
        PopSolicitudesComponent,
        PopItemSolicitudComponent,
        ModalSolicitudesComponent,
        ModalItemSolicitudComponent,
        ModalPasswordComponent,
        PopItemConsumoComponent,
        PopItemCobroComponent,
        ModalItemCobroComponent,
        PopCobrosComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        SwiperModule
    ]
})
export class ComponentsModule { }
