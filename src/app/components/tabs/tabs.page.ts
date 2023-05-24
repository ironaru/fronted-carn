import { Observable } from 'rxjs';
import { OptionsService } from './../../services/options.service';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit,ViewWillEnter {
  constructor(private options: OptionsService) {}
  ionViewWillEnter(){
    this.tabs();
  }
  list: Observable<any>;
  ngOnInit() {
    this.tabs();
  }

  tabs() {
    if (this.options.verificaRol('ADMIN')) {
      this.list = this.options.tabs('admin');
    } else if (this.options.verificaRol('SOCIO')) {
      this.list = this.options.tabs('socio');
    }
  }
}
