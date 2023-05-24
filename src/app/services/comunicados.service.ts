import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Comunicados } from '../models/comunicados';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {

constructor(private http: HttpClient) { }
private url = 'https://localhost:9090';
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
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
obtenerComunicados(): Observable<any[]>{
  return this.http.get<any[]>(this.url+'/comunicados',{headers: this.HttpHeader()});
}
obtenerComunicadosPublico(): Observable<any[]>{
  return this.http.get<any[]>(this.url+'/comunicados/user');
}
subirComunicados(comunicado: Comunicados): Observable<any>{
  return this.http.post<any>(this.url+'/comunicados',comunicado,{headers: this.HttpHeader()})
  .pipe(tap(() => this.refresh$.next()));
}
actualizarComunicados(comunicado: Comunicados): Observable<any>{
  return this.http.put<any>(this.url+'/comunicados',comunicado,{headers: this.HttpHeader()})
  .pipe(tap(() => this.refresh$.next()));
}
eliminarComunicado(comunicado: Comunicados): Observable<any>{
  return this.http.delete<any>(this.url+'/comunicados/'+comunicado.id,{headers: this.HttpHeader()})
  .pipe(tap(() => this.refresh$.next()));
}

}

