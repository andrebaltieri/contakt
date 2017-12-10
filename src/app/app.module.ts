import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ImageCropperModule } from "ng2-img-cropper/index";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { ContactListItemComponent } from '../components/contact-list-item/contact-list-item';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { ReactiveFormsModule } from '@angular/forms';
import { TakePicturePage } from '../pages/take-picture/take-picture';
import { UploadPicturePage } from '../pages/upload-picture/upload-picture';
import { CropPicturePage } from '../pages/crop-picture/crop-picture';
import { DataProvider } from '../providers/data/data';

export const firebaseConfig = {
  apiKey: "AIzaSyAK1NQU_T_XmKwaCuha9yIhOkndaljA3u8",
  authDomain: "contakt-4a014.firebaseapp.com",
  databaseURL: "https://contakt-4a014.firebaseio.com",
  projectId: "contakt-4a014",
  storageBucket: "contakt-4a014.appspot.com",
  messagingSenderId: "71817278135"
};

@NgModule({
  declarations: [
    ContactListItemComponent,
    MyApp,
    HomePage,
    ContactPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    TakePicturePage,
    UploadPicturePage,
    CropPicturePage
  ],
  imports: [
    ImageCropperModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ContactListItemComponent,
    MyApp,
    HomePage,
    ContactPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    TakePicturePage,
    UploadPicturePage,
    CropPicturePage
  ],
  providers: [
    ReactiveFormsModule,
    AngularFireDatabase,
    HttpModule,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataProvider
  ]
})
export class AppModule { }
