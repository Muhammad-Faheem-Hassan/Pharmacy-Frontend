import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpConfig } from '../../config/http-config';
import { WrapHttpService } from './common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private baseUrl = HttpConfig.mainApiUrl() + '/sale';

  constructor(private http: WrapHttpService) { }

  fetch(conditions?: object): Promise<any> {
    return lastValueFrom(this.http.get(this.baseUrl + WrapHttpService.objToQuery(conditions)));
  }
  add(data: object): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}`, data));
  }
  delete(id: string): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
  getById(id: string): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/${id}`));
  }
 
  update(id: string, value: any): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}`, value));
  }
  
}
