import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  ui: any;

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
  }

  ngOnInit() {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', this.getUiConfig());
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
      signInSuccessUrl: 'home',
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
}
