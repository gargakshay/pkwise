import { UserData, OtpData } from './../common/container/container';
import { RestcallService } from './../restcall.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isSubmit = false;
  user: UserData;
  otpData: OtpData;
  constructor(private restcallService: RestcallService) {
    this.user = new UserData('', '', '');
    this.otpData = new OtpData('', '');
  }

  ngOnInit() {
  }

  submit(form) {
    console.log('submit', form);
    this.isSubmit = !this.isSubmit;

    if (!this.isSubmit) {
      this.otpData.mobile = this.user.mobile;
      this.restcallService.verifyOpt(this.otpData).subscribe(val => {
        console.log('OTP Response ', val);
      });
      alert('Record Saved...!!!')
    } else {
      this.restcallService.addUserInfo(this.user);
    }


  }

}
