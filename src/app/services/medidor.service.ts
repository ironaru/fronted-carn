/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedidorService {

constructor(private http: HttpClient) { }
  private url = 'https://localhost:9090';
  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'responseType': 'text',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return headers;
  }
  medidores: any[] = [];
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
  getMedidores(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/medidores',
    {headers: this.HttpHeader()});
  }
  getMedidoresUsuario(): Observable<any[]>{
    return this.http.get<any[]>(this.url+'/medidoresUsuario',
    {headers: this.HttpHeader()});
  }
  eliminarMedidor(id: number){
    return this.http.delete<any[]>(this.url+'/medidores/'+id,
    {headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  addMedidor(med: any): Observable<any>{
    return this.http.post(this.url+'/medidores', med,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  getMedidor(id: string): Observable<any>{
    return this.http.get<any>(this.url+'/medidores/'+id, {headers: this.HttpHeader()});
  }
  getMedidorUser(id: string): Observable<any>{
    return this.http.get<any>(this.url+'/medidorUser/'+id, {headers: this.HttpHeader()});
  }
  putMedidor(medidor: any): Observable<any>{
    return this.http.put<any>(this.url+'/medidores/'+medidor.id, medidor,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  getSocio(id: string): Observable<any>{
    return this.http.get<any>(this.url+'/socios/'+id, {headers: this.HttpHeader()});
  }
  medidorSocio(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/medidores/socio/' + id, {headers: this.HttpHeader()});
  }
}
