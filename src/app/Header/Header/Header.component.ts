import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  checkUrl = ['/', '/login', '/register'];
  curUrl: any;
  constructor(
    public rout: Router,
    private angularFireAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
  }

  signOut() {
    this.angularFireAuth.auth.signOut().then(res => {
      window.location.assign('/login');
      this.snackBar.open('SignOut Successfull', 'Dismiss', { duration: 3000 });
      console.log('Sign - out successful...');
    }).catch(error => {
      console.log('An error happened...', error);
    });
  }
}
