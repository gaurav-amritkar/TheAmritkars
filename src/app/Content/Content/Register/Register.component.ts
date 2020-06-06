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

  ngOnInit() {
  }

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

}
