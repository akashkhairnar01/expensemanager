import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  confirmationResult: firebase.auth.ConfirmationResult | undefined;

  constructor(
    private firebaseAuth: AngularFireAuth
  ) { }

  signInWithPhoneNumber(captchaVerify: any, c_code: any, mobileNo: any) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.signInWithPhoneNumber(c_code + mobileNo, captchaVerify).then((response) => {
        this.confirmationResult = response;
        resolve(this.confirmationResult);
      }).catch((error) => {
        reject(`SMS not send ${error}`);
      })
    });
  }
}
