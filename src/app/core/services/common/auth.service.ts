import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static readonly LOGGED_USER_KEY = 'mrss-user';
  static loggedUser = null;

  private static logStatus = new Subject<boolean>();
  public static getLogStatus(): Observable<any> {
    return this.logStatus.asObservable();
  }

  static isLogged() {
    const loggedUser = StorageService.getItem(AuthService.LOGGED_USER_KEY);
    this.loggedUser = loggedUser;
    // TODO; If token expired remove the session.
    // const isLogged = loggedUser && new Date(loggedUser.exp).getTime() > Math.round((new Date()).getTime() / 1000);
    const isLogged = loggedUser && true;
    if (!isLogged) {
      this.removeLoggedUser();
    }
    return isLogged;
  }

  static getLoggedUser() {
    return StorageService.getItem(AuthService.LOGGED_USER_KEY);
  }

  static setLoggedUser(userAllDetails: any) {
    const tokenWithDetail = {
      data: {
        id: userAllDetails.id,
        name: userAllDetails.name,
        email: userAllDetails.email,
        RoleId: userAllDetails.RoleId,
        role: userAllDetails.role,
        verified: userAllDetails.verified,
        isBlocked: userAllDetails.isBlocked,
      },
      permissions: [],
      tokenInfo: ''
    };
    // TODO;
    // const tokenDetails = JSON.parse(atob(userAllDetails.accessToken.split('.')[1]));
    // tokenWithDetail[`exp`] = tokenDetails.exp;
    // tokenWithDetail[`iat`] = tokenDetails.iat;
    tokenWithDetail[`tokenInfo`] = userAllDetails.accessToken;
     if (userAllDetails.permissions) {
      tokenWithDetail[`permissions`] = JSON.parse(JSON.stringify(userAllDetails.permissions));
      console.log(tokenWithDetail[`permissions`],"<<<<<-----");
      
    }
    StorageService.setItem(AuthService.LOGGED_USER_KEY, tokenWithDetail);
    this.logStatus.next(true);
  }

  static removeLoggedUser() {
    StorageService.removeItem(AuthService.LOGGED_USER_KEY);
    this.logStatus.next(false);
    return true;
  }

  static checkPermission(actionIdentifier: string | string[]): boolean {
    const user = this.getLoggedUser();
    // If user not exist or doesn't have permissions, return false.
    if (!user || !user.permissions || !user.permissions?.length) {
      return false;
    }

    if (typeof actionIdentifier === 'string') {
      actionIdentifier = [actionIdentifier];
    }

    return actionIdentifier.some(permission => user.permissions.includes(permission));
  }

}