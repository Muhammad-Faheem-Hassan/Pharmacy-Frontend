import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../../config/http-config';
import { WrapHttpService } from './wrap-http.service';

@Injectable()
export class AuthenticationService {
  public readonly apiUrl = HttpConfig.authApiUrl();
  // public readonly baseUrl = environment.baseUrl;

  constructor(public http: WrapHttpService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + '/auth/login', {
      email,
      password
    });
  }

  // verifyOtp(email: string, otp: number): Observable<any> {
  //   return this.http.post(this.apiUrl + '/verify-otp', { email, otp });
  // }

  // resendOtp(email: string): Observable<any> {
  //   return this.http.post(this.apiUrl + '/resend-otp', { email });
  // }

  // forgotPassword(email: string): Observable<any> {
  //   return this.http.post(this.apiUrl + '/forgot-password', { email });
  // }

  // checkOtp(email: string, otp: number): Observable<any> {
  //   return this.http.post(this.apiUrl + '/check-otp', { email, otp });
  // }

  changePassword(email: string, password: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl + '/change-password', { email: email, password: password, newPassword: newPassword });
  }

  resetPassword(email: string, password: string, otp: string) {
    return this.http.post(this.apiUrl + '/reset-password', {
      email,
      password,
      otp
    });
  }
}