import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { setPersistence, browserSessionPersistence } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();
  userEmail: any;
  authUser: any = {};

  private userAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(this.authUser);
  userAuthenticated$ = this.userAuthenticatedSubject.asObservable();
  userData$ = this.userSubject.asObservable();

  checkUserStatus() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userAuthenticatedSubject.next(true);
        this.userSubject.next(user);
        this.userEmail = user.email;
      } else {
        console.log("No user found.");
      }
    })
  }

  async loginUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
    this.auth.setPersistence(browserSessionPersistence);
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
        this.userAuthenticatedSubject.next(true);
        this.userEmail = userCredential.user.email;
        callback({  success: true, message: userCredential })
    })
    .catch((error) => {
        this.userAuthenticatedSubject.next(false);
        callback({ success: false, message: error.code })
    })
  }

  logOutUser(callback: (response: { success: boolean, message?: any }) => void) {
    signOut(this.auth)
    .then(() => {
        this.userAuthenticatedSubject.next(false);
        callback({ success: true });
    })
    .catch((error) => {
        this.userAuthenticatedSubject.next(true);
        callback({ success: false, message: error })
    })
  }
}
