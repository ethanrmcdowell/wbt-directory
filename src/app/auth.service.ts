import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { browserSessionPersistence } from '@angular/fire/auth';

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

  async loginUser(email: string, password: string, callback: (response: { success: boolean, message: String }) => void) {
    this.auth.setPersistence(browserSessionPersistence);
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
        this.userAuthenticatedSubject.next(true);
        this.userEmail = userCredential.user.email;
        callback({  success: true, message: userCredential.toString() })
    })
    .catch((error) => {
        this.userAuthenticatedSubject.next(false);
        callback({ success: false, message: error.code })
    })
  }

  logOutUser(callback: (response: { success: boolean, message?: String }) => void) {
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
