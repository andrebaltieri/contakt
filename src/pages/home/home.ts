import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: string = null;
  public list: string = 'all';
  public contacts: any[] = [];

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(
      (data) => {
        this.user = data.email;
      });
  }

  showMoreOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seu Perfil',
      buttons: [
        {
          text: this.user
        }, {
          text: 'Sair',
          handler: () => this.logout()
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  goToContact(contact: Contact) {
    if (!contact) {
      contact = new Contact('Novo', 'Contato', 'assets/imgs/user.png', [], [], []);
    }

    this.navCtrl.push(ContactPage, { contact: contact });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}
