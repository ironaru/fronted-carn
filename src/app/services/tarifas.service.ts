import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  constructor(private http: HttpClient) {}
  url = 'https://localhost:9090';
  HttpHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*',
      'responseType': 'text',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return headers;
  }
  private refresh$ = new Subject<void>();
  get _refresh$() {
    return this.refresh$;
  }
  getTarifas$():Observable<any> {
    return this.http.get(this.url+"/tarifas",{headers: this.HttpHeader()});
  }
  saveTarifas(tarifa: any){
    return this.http.post(this.url+"/tarifas",tarifa,{headers: this.HttpHeader()})
    .pipe(tap(() => this.refresh$.next()));
  }

}
