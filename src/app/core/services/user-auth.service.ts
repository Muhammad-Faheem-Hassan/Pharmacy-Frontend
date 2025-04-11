import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { HttpConfig } from '../../config/http-config';
import { WrapHttpService } from './common/wrap-http.service';



@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    private baseUrl = HttpConfig.mainApiUrl() + '/auth';
    private Url = HttpConfig.mainApiUrl() + '/user';
  apiUrl: string | undefined;
    constructor(private http: WrapHttpService) { }

//   signUp(data) {
//     return this.post(this.apiUrl + '/signup', data);
//   }

//   verifyAccount(verification) {
//     return this.post(this.apiUrl + '/verify-email', { verification });
//   }

//   resendVerificationEmail(email) {
//     return this.post(this.apiUrl + '/resend-verify-email', { email });
//   }

  logIn(data: object): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}/login`, data));
  }

  loginByOtp(data: object, otp:string): Promise<any> {
    return lastValueFrom(this.http.post(`${this.baseUrl}/login/${otp}`, data));
  }

  resetPassword(email: any, password: any) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/reset-password`, {email, password}));
  }

  forgotPassword(data: any) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/forgot-password`, data));
  }
  post(arg0: string, data: any) {
    throw new Error('Method not implemented.');
  }

  forgotPasswordVerify(verification: object) {
    return lastValueFrom(this.http.post(`${this.baseUrl}/forgot-password-verify`,  verification ));
  }

  changePassword(password: string, newPassword: string): Promise<any> {
    const data = { password, newPassword };
    console.log(data,"data,<<<<<<<<<<<<");
    
    return lastValueFrom(this.http.post(`${this.Url}/change-password`, data));
  }
}