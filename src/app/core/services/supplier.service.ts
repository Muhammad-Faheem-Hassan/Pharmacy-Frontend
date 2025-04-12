import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpConfig } from '../../config/http-config';
import { WrapHttpService } from './common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = HttpConfig.mainApiUrl() + '/supplier';

  constructor(private http: WrapHttpService) { }

  getItems(conditions?: object): Promise<any> {
    return lastValueFrom(this.http.get(this.baseUrl + WrapHttpService.objToQuery(conditions)));
  }
  addItems(data: object): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}`, data));
  }
  deleteItem(id: string): Promise<any> {
    return lastValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }
  getItemById(id: string): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/${id}`));
  }
 
  updateItems(id: string, value: any): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}`, value));
  }
  
}
