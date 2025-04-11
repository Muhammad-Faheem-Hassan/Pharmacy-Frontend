import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpConfig } from '../../../../config/http-config';
import { WrapHttpService } from './wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class GeoDbService {
  private baseUrl = HttpConfig.mainApiUrl() + '/geo-db';

  constructor(private http: WrapHttpService) { }

  getStates(conditions?: object): Promise<any> {
    return lastValueFrom(this.http.get(this.baseUrl + "/state" + WrapHttpService.objToQuery(conditions)));
  }
}
