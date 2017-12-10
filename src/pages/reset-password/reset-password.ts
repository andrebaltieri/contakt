import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { md5 } from '../../utils/md5';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
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
      ])]
    });
  }

  updateImage() {
    let hash = md5(this.form.controls['email'].value);
    this.image = 'https://www.gravatar.com/avatar/' + hash + '?s=200';
  }

  submit() {
    let loading = this.loadingCtrl.create({ content: 'Restaurando sua senha...' });
    loading.present();

    this.afAuth.auth.sendPasswordResetEmail(this.form.controls['email'].value)
      .then((data) => {
        loading.dismiss();
        this.alertCtrl.create({
          title: 'Senha Restaurada',
          message: 'Uma nova senha foi gerada e enviada para <strong>' + this.form.controls['email'].value + '</strong>!',
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
        if (err.code == 'auth/user-not-found') {
          this.toastCtrl.create({ message: 'E-mail não encontrado', showCloseButton: true, duration: 1500 }).present();
        } else {
          this.toastCtrl.create({ message: 'Ops, algo deu errado!', showCloseButton: true, duration: 1500 }).present();
        }
      });
  }

  goToLogin() {
    this.viewCtrl.dismiss();
  }
}
