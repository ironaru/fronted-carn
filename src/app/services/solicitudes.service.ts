import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Solicitudes } from '../models/solicitudes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
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
  obtenerSolicitudes(): Observable<Solicitudes[]>{
    return this.http.get<Solicitudes[]>(this.url+'/solicitudes',{headers: this.HttpHeader()});
  }
  obtenerSolicitudesUser(): Observable<Solicitudes[]>{
    return this.http.get<Solicitudes[]>(this.url+'/solicitudes/user',{headers: this.HttpHeader()});
  }
  subirSolicitud(solicitud: Solicitudes): Observable<Solicitudes>{
    return this.http.post<Solicitudes>(this.url+'/solicitudes',solicitud,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  responderSolicitud(solicitud: Solicitudes): Observable<Solicitudes>{
    return this.http.put<Solicitudes>(this.url+'/solicitudes',solicitud,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
  eliminarSolicitud(solicitud: Solicitudes){
    return this.http.delete(this.url+'/solicitudes/'+solicitud.id,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }
}
