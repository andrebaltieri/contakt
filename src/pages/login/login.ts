import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { md5 } from '../../utils/md5';
import { LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public form: FormGroup;
  public image: string = 'assets/imgs/contakt.png';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    let loading = this.loadingCtrl.create({ content: 'Autenticando...' });
    loading.present();

    this.afAuth.authState.subscribe(
      (data) => {
        loading.dismiss();
        if (data && data.email) {
          this.form.controls['email'].setValue(data.email);
          this.updateImage();
          this.navCtrl.setRoot(HomePage);
        }
      }, (err) => {
        this.toastCtrl.create({ message: 'Acesso expirado', showCloseButton: true, duration: 1500 }).present();        
        loading.dismiss();
      });
  }

  updateImage() {
    let hash = md5(this.form.controls['email'].value);
    this.image = 'https://www.gravatar.com/avatar/' + hash + '?s=200';
  }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  submit() {
    let loading = this.loadingCtrl.create({ content: 'Autenticando...' });
    loading.present();

    this.afAuth.auth.signInWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then((data) => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch((err) => {
        loading.dismiss();
        if (err.code == 'auth/user-not-found') {
          this.toastCtrl.create({ message: 'Cadastro não encontrado', showCloseButton: true, duration: 1500 }).present();
        } else if (err.code == 'auth/wrong-password') {
          this.toastCtrl.create({ message: 'Usuário ou senha inválidos', showCloseButton: true, duration: 1500 }).present();
        } else {
          this.toastCtrl.create({ message: 'Ops, algo deu errado!', showCloseButton: true, duration: 1500 }).present();
        }
      });
  }
}
