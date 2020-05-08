import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  code: any;
  phonenumber: any;
  confirmRe: any;
  recaptchaWidgetId: any;
  app: any;
  ui: any;
  mobileField = true;
  subDisabled = true;
  otpField = false;

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    if (this.ui.isPendingRedirect()) {
      this.ui.start('#firebaseui-auth-container', this.getUiConfig());
    }

    this.AppVerifier().render().then(wId => {
      // console.log('WidgetId', wId);
      this.recaptchaWidgetId = wId;
    });
  }

  getUiConfig() {
    return {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          console.log('Signin Success with Auth rslt', authResult);

          let user = authResult.user;
          let credential = authResult.credential;
          let isNewUser = authResult.additionalUserInfo.isNewUser;
          let providerId = authResult.additionalUserInfo.providerId;
          let operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      // Query parameter name for mode.
      queryParameterForWidgetMode: 'mode',
      // Query parameter name for sign in success url.
      queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: './home.html',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // Invisible reCAPTCHA with image challenge and bottom left badge.
          recaptchaParameters: {
            type: 'image',
            size: 'normal',
            badge: 'bottomleft'
          }
        }
      ],
      // Set to true if you only have a single federated provider like
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID and you would like to
      // immediately redirect to the provider's site instead of showing a
      // 'Sign in with Provider' button first. In order for this to take
      // effect, the signInFlow option must also be set to 'redirect'.
      immediateFederatedRedirect: false,
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'www.google.com'
      // Privacy policy url/callback.
      /* privacyPolicyUrl: function() {
        window.location.assign('<your-privacy-policy-url>');
      } */
    };
  }

  checkDigit(type: any, event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (type === 'mobile' && event.target.value.length > 9) {
        return false;
      }
      if (type === 'otp' && event.target.value.length > 5) {
        return false;
      }
    } else {
      return false;
    }
  }


  AppVerifier() {
    this.app = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container', {
        size: 'normal',
        callback(response) {
          this.submitPhoneNumberAuth();
        }
      });
    return this.app;
  }

  checkDisMobile() {
    console.log('in Check mobile', this.phonenumber.length);
    if (this.phonenumber.length === 10) {
      this.subDisabled = false;
    }
  }

  submitPhoneNumberAuth() {
    if (this.phonenumber.length < 10) {
      return;
    }
    const phoneNumber = '+91' + this.phonenumber;
    const appVerifier = this.app;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
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
        firebase.auth().onAuthStateChanged( user => {
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
