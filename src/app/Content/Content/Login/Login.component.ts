import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';


@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  ui: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) {
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', this.getUiConfig());
  }

  ngOnInit() {}

  getUiConfig() {
    return {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          console.log('Signin Success with Auth rslt', authResult);

          const user = authResult.user;
          const credential = authResult.credential;
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          const providerId = authResult.additionalUserInfo.providerId;
          const operationType = authResult.operationType;

          if (isNewUser) {
            window.location.assign('/register');
          } else {
            window.location.assign('/home');
          }
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
      // Query parameter name for mode.
      queryParameterForWidgetMode: 'mode',
      // Query parameter name for sign in success url.
      queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      // signInSuccessUrl: '/home',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          // Invisible reCAPTCHA with image challenge and bottom left badge.
          recaptchaParameters: {
            type: 'image',
            size: 'normal',
            badge: 'bottomleft'
          },
          defaultCountry: 'IN'
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
