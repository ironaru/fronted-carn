import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Reclamos } from '../models/reclamos';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReclamosService {
  constructor(private http: HttpClient) {}
  private url = 'https://localhost:9090';
  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'responseType': 'text/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return headers;
  }
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
  obtenerReclamos(): Observable<Reclamos[]>{
    return this.http.get<Reclamos[]>(this.url+'/reclamos',{headers: this.HttpHeader()});
  }
  obtenerReclamosUser(): Observable<Reclamos[]>{
    return this.http.get<Reclamos[]>(this.url+'/reclamos/user',{headers: this.HttpHeader()});
  }
  subirReclamo(reclamo: Reclamos): Observable<Reclamos>{
    return this.http.post<Reclamos>(this.url+'/reclamos',reclamo,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  responderReclamo(reclamo: Reclamos): Observable<Reclamos>{
    return this.http.put<Reclamos>(this.url+'/reclamos',reclamo,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  eliminarReclamo(reclamo: Reclamos){
    return this.http.delete(this.url+'/reclamos/'+reclamo.id,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }

}
