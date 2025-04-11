import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpConfig } from '../../config/http-config';
import { WrapHttpService } from './common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = HttpConfig.mainApiUrl() + '/items';

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
  getAllTaskItemById(id: string): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/${id}/taskItems`));
  }
  getAllTaskItemByUid(id: string): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/${id}/uid`));
  }
  getRejections(id: string): Promise<any> {
    return lastValueFrom(this.http.get(`${this.baseUrl}/${id}/rejection`))
  }
  updateItems(id: string, value: any): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}`, value));
  }
  handleRejection(id: string, value: any): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}/rejection`, value));
  }
  updateAssignee(id: string, value: any): Promise<any> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}/assignee`, value));
  }
  updateMetadata(id: string, value: any): Promise<any> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}/metaData`, value));
  }
  updateTranslation(id: string, value: any): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.baseUrl}/${id}/translation`, value));
  }

  getItemsByBrand(conditions?: object): Promise<any> {
    const query = conditions ? WrapHttpService.objToQuery(conditions) : '';
    const url = `${this.baseUrl}/report/stage-counts${query}`;
    return lastValueFrom(this.http.get(url));
  }
  getItemsByBrandLanguagesStages(conditions?: object): Promise<any> {
    const query = conditions ? WrapHttpService.objToQuery(conditions) : '';
    const url = `${this.baseUrl}/report/language/stage-counts${query}`;
    return lastValueFrom(this.http.get(url));
  }

  getPublishedItemsByBrand(conditions?: object): Promise<any> {
    const query = conditions ? WrapHttpService.objToQuery(conditions) : '';
    const url = `${this.baseUrl}/published/report${query}`;
    return lastValueFrom(this.http.get(url));
  }

  getPublishedItems(conditions?: object): Promise<any> {
    const query = conditions ? WrapHttpService.objToQuery(conditions) : '';
    const url = `${this.baseUrl}/report/published-counts-by-day${query}`;
    return lastValueFrom(this.http.get(url));
  }
  getPublishedItemsMontly(conditions?: object): Promise<any> {
    const query = conditions ? WrapHttpService.objToQuery(conditions) : '';
    const url = `${this.baseUrl}/report/published/items${query}`;
    return lastValueFrom(this.http.get(url));
  }
  getPublishedItemsBrandWise(): Promise<any> {
    const url = `${this.baseUrl}/report/feed-quantities`;
    return lastValueFrom(this.http.get(url));
  }
}
