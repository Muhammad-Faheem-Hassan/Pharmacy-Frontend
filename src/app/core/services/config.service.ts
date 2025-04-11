import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  url = environment.mainUrl;

  constructor(private http: HttpClient) { }

  getConfigs() {
    return this.http.get(this.url  +"setting"); 
  }
  changeToken(data:any) {
    return this.http.put(this.url  +"config",data); 
  }
  validateToken(data:any) {
    return this.http.post(this.url  +"setting/validate-access-token",data); 
  }
}
