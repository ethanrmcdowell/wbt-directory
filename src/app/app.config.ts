import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"wbt-directory","appId":"1:1013557158803:web:e7ddcfafe3e70bfbb63e66","storageBucket":"wbt-directory.appspot.com","apiKey":"AIzaSyAFR7KIpH26KyBE-a8SlLciMFGQ17xEM0A","authDomain":"wbt-directory.firebaseapp.com","messagingSenderId":"1013557158803","measurementId":"G-7RGMDJBJ6C"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
