import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Observable } from 'rxjs';
import { UserLoginData } from "../models/user_structures"
import firebase from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;

  constructor( private fireAuth: AngularFireAuth) { }

  get user(): Promise<firebase.User> {
    return this.fireAuth.currentUser;
  }

  login(user: UserLoginData): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: UserLoginData): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

}