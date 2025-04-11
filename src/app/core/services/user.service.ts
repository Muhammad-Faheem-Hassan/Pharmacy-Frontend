import { Injectable } from '@angular/core';
import { WrapHttpService } from './common/wrap-http.service';
import { HttpConfig } from '../../config/http-config';
import { Observable, lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = HttpConfig.mainApiUrl() + '/user';
  userUrl = HttpConfig.mainApiUrl() + '/user';

  constructor(private http: WrapHttpService) { }
  // Get users list
  getUsers(conditions?: object) {
    return lastValueFrom(this.http.get(this.userUrl + WrapHttpService.objToQuery(conditions)));
  }

  getUser(id: string) {
    return lastValueFrom(this.http.get(this.userUrl + "/" + id));
  }

  //get current loggedIn User
  getCurrentUser() {
    return this.http.get(this.userUrl + '/current');
  }

  updateCurrentUser(data: object): Promise<Object> {
    return lastValueFrom(this.http.patch(`${this.userUrl}`, data));
  }

  addUser(data: object): Promise<any> {
    return lastValueFrom(this.http.post(`${this.apiUrl}`, data));
  }

  updateUser(id: string, data: object) {
    return lastValueFrom(this.http.patch(`${this.userUrl}/${id}`, data));
  }

  //set current user profile
  // setCurrentUserProfile(data) {
  //   return this.http.put(this.userUrl + '/current', data);
  // }

  // changeActivationStatusOfUser(id: number, status: Boolean) {
  //   return this.http.put(this.userUrl, { id, isActive: status });
  // }

  deleteUser(id: any) {
    return lastValueFrom(this.http.delete(`${this.userUrl}/${id}`));
  }
}
