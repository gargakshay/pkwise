import { UserData, OtpData } from './../common/container/container';
import { RestcallService } from './../restcall.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isUserForm = true;
  user: UserData;
  otpData: OtpData;
  errorMsg: string;
  constructor(private restcallService: RestcallService, private snackBar: MatSnackBar) {
    this.user = new UserData('', '', '');
  }

  ngOnInit() {
  }

  submitUserDetails() {
    this.restcallService.addUserInfo(this.user).subscribe(
      val => {
        this.isUserForm = false;
        this.errorMsg = '';
        this.otpData = new OtpData(this.user.mobile, '');
      },
      error => {
        console.error('Error in addUserInfo', error)
        this.errorMsg = `*${error.error}`;
      });

  }

  submitOtp() {
    this.restcallService.verifyOpt(this.otpData).subscribe(
      val => {
        this.openSnackBar('Detail Saved Successfully');
        this.newUserForm();
      },
      error => {
        if (error.error) {
          this.errorMsg = `*Incorrect OTP! Please re-enter the OTP.`;
        }
      });
  }

  newUserForm() {
    this.isUserForm = true;
    this.user = new UserData('', '', '');
    this.errorMsg = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

}
