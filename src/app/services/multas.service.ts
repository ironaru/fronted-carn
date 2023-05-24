import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultasService {

constructor(private http: HttpClient) { }

private url = 'https://localhost:9090';

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

multasUsers(){
  return this.http.get(this.url+'/multas',{headers: this.HttpHeader()});
}
multasUser(){
  return this.http.get(this.url+'/multas/user',{headers: this.HttpHeader()});
}
}
