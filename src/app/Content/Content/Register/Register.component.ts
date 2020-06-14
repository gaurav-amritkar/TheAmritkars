import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  phoneNumber: any;

  //
  code: any;
  confirmRe: any;
  recaptchaWidgetId: any;
  app: any;
  ui: any;
  mobileField = true;
  subDisabled = true;
  otpField = false;
  //

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.angularFireAuth.user.subscribe(res => {
      if (res === null) {
        window.location.assign('/login');
        this.snackBar.open('User is not Authenticated', 'Dismiss', { duration: 2000 });
      } else {
        this.phoneNumber = res.phoneNumber;
      }
    });
  }

  ngOnInit() { }

  AddUser() {
    console.log('In add User func');

    const item = {
      first_name: 'Firebase',
      last_name: 'User',
      mobile_number: this.phoneNumber,
      dummy: 'this does not exist already'
    };
    // Creates a document by provided name in the given collection and sets the data into it
    return this.firestore.collection('users').doc('user_00000').set(item);
  }

  DeleteUser() {
    console.log('In delete User func');

    // Deletes a document by provided name in the given collection
    return this.firestore.collection('users').doc('user_00000').delete();
  }

  submitPhoneNumberAuth() {
    if (this.phoneNumber.length < 10) {
      return;
    }
    const phoneNumber = '+91' + this.phoneNumber;
    const appVerifier = this.app;
    this.angularFireAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        this.confirmRe = confirmationResult;
        this.mobileField = false;
        this.otpField = true;
      })
      .catch(error => {
        this.snackBar.open('Message Not Send', 'Dismiss', { duration: 3000 });
        console.log('SMS not Send', error);
      });
  }

  SubmitPhoneNumberAuthCode() {
    const cod = this.code;
    this.confirmRe.confirm(cod)
      .then(result => {
        this.otpField = true;
        this.mobileField = false;
        const use = result.user;
        if (use != null) {
          console.log(use.displayName);
          console.log(use.email);
          console.log(use.photoURL);
          console.log(use.emailVerified);
          console.log(use.uid);
          console.log('User Token', use.refreshToken);
          console.log('MetaData', use.metadata.lastSignInTime);
          // The user's ID, unique to the Firebase project. Do NOT use
          // this value to authenticate with your backend server, if
          // you have one. Use User.getToken() instead.
        }
        // if (use != null) {
        //   use.providerData.forEach(profile => {
        //     console.log('Sign-in provider: ' + profile.providerId);
        //     console.log('Provider-specific UID: ' + profile.uid);
        //     console.log('Name: ' + profile.displayName);
        //     console.log('Email: ' + profile.email);
        //     console.log('Photo URL: ' + profile.photoURL);
        //   });
        // }
        // console.log('User', use);
        this.angularFireAuth.auth.onAuthStateChanged(user => {
          if (user) {
            console.log('USER LOGGED IN');
            this.snackBar.open('User Logged In Successfully', 'Dismiss', { duration: 3000 });
          } else {
            console.log('USER NOT LOGGED IN');
          }
        });
      })
      .catch(error => {
        this.snackBar.open('Bad Verification Code', 'Dismiss', { duration: 3000 });
        console.log('Bad Verification Code', error);
      });
  }

}
