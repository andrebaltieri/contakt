import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { md5 } from '../../utils/md5';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public form: FormGroup;
  public image: string = 'assets/imgs/contakt.png';  

  constructor(
    private fb: FormBuilder,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
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
  }
  
  updateImage() {
    let hash = md5(this.form.controls['email'].value);
    this.image = 'https://www.gravatar.com/avatar/' + hash + '?s=200';
  }

  submit() {
    let loading = this.loadingCtrl.create({ content: 'Registrando...' });
    loading.present();

    this.afAuth.auth.createUserWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then((data) => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Bem vindo ao Contakt',
          message: 'Sua conta foi criada e você já pode acessar nosso aplicativo!',
          buttons: [
            {
              text: 'OK',
              handler: data => {
                this.goToLogin();
              }
            }
          ]
        }).present();
      })
      .catch((err) => {
        loading.dismiss();
        if (err.code == 'auth/email-already-in-use') {
          this.toastCtrl.create({ message: 'E-mail já cadastrado', showCloseButton: true, duration: 1500 }).present();
        } else {
          this.toastCtrl.create({ message: 'Ops, algo deu errado!', showCloseButton: true, duration: 1500 }).present();
        }
      });
  }

  goToLogin() {
    this.viewCtrl.dismiss();
  }
}
