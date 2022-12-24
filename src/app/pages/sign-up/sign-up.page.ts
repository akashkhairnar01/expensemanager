import { Component, OnInit } from '@angular/core';
import { countryJson } from '../../../environments/environment';
import firebase from "firebase/compat/app";
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  mobileNo: number | undefined;
  countryJson: any;
  countryCodePopoverSheet = {
    subHeader: 'Select your country code',
  };
  countryCode = '+91';
  otp: string = '';
  showOtpInput: boolean = false;
  otpMessage: string = 'An OTP is sent to your number. You should receive it in 15 s';
  isOtp = false;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier | undefined;
  constructor(
    private authService: AuthenticationService
  ) {
    this.countryJson = countryJson.sort((a: any, b: any) => {
      return a.name - b.name;
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.verifyRecaptcha();
  }

  ionViewDidLoad() {
    this.verifyRecaptcha();
  }

  verifyRecaptcha() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button', {
      size: 'invisible',
      callback: (response: any) => { },
      'expired-callback': () => { }
    });
  }

  sendOtp() {
    console.log(this.countryCode + ' ' + this.mobileNo);
    this.authService.signInWithPhoneNumber(this.recaptchaVerifier, this.countryCode, this.mobileNo).then(() => {
      console.log('otp received');
      this.isOtp = false;
    }).catch(error => {
      console.log(error);
    });
  }
  verifyOtp() {
    throw new Error('Method not implemented.');
  }
  codeSelect(ev: any) {
    console.log(ev);
  }
}
