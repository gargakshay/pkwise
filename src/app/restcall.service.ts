import { OtpData } from './common/container/container';
import { User } from './common/interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RestcallService {

  signUpUrl = '//54.159.136.87/api/signup/';
  otpUrl = '//54.159.136.87/api/signup_otp_verification/';

  constructor(private httpClient: HttpClient) { }
  //Observable<User>
  addUserInfo(user: User) {
    return this.httpClient.post<User>(this.signUpUrl, user, httpOptions);
  }

  verifyOpt(otpData: OtpData) {
    return this.httpClient.post<User>(this.otpUrl, otpData, httpOptions);
  }

}
