import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cobros } from '../models/cobros';

@Injectable({
  providedIn: 'root'
})
export class ConsumosService {

constructor(
  private http: HttpClient
  ) { }

  private url = "https://localhost:9090"



  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*/*',
      responseType: 'text',
      Authorization: 'Bearer ' + this.getToken(),
    });
    return headers;
  }
  private getToken() {
    return localStorage.getItem('token');
  }
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
  getConsumos(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/consumos/'+id,{headers: this.HttpHeader()});
  }
  postConsumos(consumo: any): Observable<any>{
    return this.http.post(this.url+'/consumos',consumo,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  generarFactura(consumo: number, factura: any): Observable<any>{
    return this.http.post(this.url+'/factura/consumo/'+consumo,factura ,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  getTarifas(consumo: any): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/genera/'+consumo.fecha+'&'+consumo.lectura,{headers: this.HttpHeader()});
  }
  confirmarFactura(cobro: Cobros): Observable<any>{
    return this.http.put(this.url+'/factura',cobro,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  getCobros(medidor: number): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/cobros/medidor/'+medidor,{headers: this.HttpHeader()});
  }
}
