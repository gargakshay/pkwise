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
  isSubmitting = false;

  constructor(private restcallService: RestcallService, private snackBar: MatSnackBar) {
    this.user = new UserData('', '', '');
  }

  ngOnInit() {
  }

  submitUserDetails() {
    this.isSubmitting = true;
    this.restcallService.addUserInfo(this.user).subscribe(
      val => {
        this.isUserForm = false;
        this.isSubmitting = false;
        this.errorMsg = '';
        this.otpData = new OtpData(this.user.mobile, '');
      },
      error => {
        console.error('Error in addUserInfo', error);
        this.isSubmitting = false;
        this.errorMsg = `*Email or Mobile number must be Unique`;
      }
    );

  }

  submitOtp() {
    this.isSubmitting = true;
    this.restcallService.verifyOpt(this.otpData).subscribe(
      val => {
        this.openSnackBar('Detail Saved Successfully');
        this.newUserForm();
        this.isSubmitting = false;
      },
      error => {
        this.isSubmitting = false;
        if (error.error) {
          this.errorMsg = `*Incorrect OTP! Please re-enter the OTP.`;
        }
      });
  }

  resendOtp() {
    this.restcallService.resendOtp(this.user.mobile).subscribe();
  }

  editInfo() {
    this.isUserForm = true;
    this.errorMsg = '';
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
