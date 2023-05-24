/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/member-ordering */
import { Observable } from 'rxjs';
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
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
  constructor(private HttpClient: HttpClient) { }

  public getRoles(): any{
    return this.HttpClient.get(this.url+'/roles',{headers: this.HttpHeader()});
  }
  public getRol(n: number): Observable<any>{
    return this.HttpClient.get<any>(this.url+'/'+n,{headers: this.HttpHeader()});

  }
}
