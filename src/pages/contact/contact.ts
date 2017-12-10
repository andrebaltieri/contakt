import { Component } from '@angular/core';
import { ActionSheetController, ModalController, NavParams, AlertController } from 'ionic-angular';
import { UploadPicturePage } from '../upload-picture/upload-picture';
import { TakePicturePage } from '../take-picture/take-picture';
import { Contact } from '../../models/contact.model';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DataProvider } from '../../providers/data/data';
import { Address } from '../../models/address.model';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public contact: Contact = null;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private dataProvider: DataProvider) {
    this.contact = this.navParams.get('contact');
  }

  showMoreOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções do contato',
      buttons: [
        {
          text: 'Enviar um E-mail'
        }, {
          text: 'Ligar'
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  showChangeImage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Alterar Imagem',
      buttons: [
        {
          text: 'Enviar Imagem',
          handler: () => {
            let modal = this.modalCtrl.create(UploadPicturePage);
            modal.present();

            modal.onDidDismiss(data => {
              if (data) {
                this.contact.picture = data;
              }
            });
          }
        }, {
          text: 'Tirar Foto',
          handler: () => {
            let modal = this.modalCtrl.create(TakePicturePage);
            modal.present();

            modal.onDidDismiss(data => {
              if (data) {
                this.contact.picture = data;
              }
            });
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  showAddressOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Novo endereço',
      buttons: [
        {
          text: 'Localização Atual',
          handler: () => {
            this.getAddressByCurrentLocation();
          }
        }, {
          text: 'Buscar pelo CEP'
        }, {
          text: 'Digitar Manualmente'
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  addPhone() {
    this.alertCtrl.create({
      title: 'Adicionar Telefone',
      inputs: [
        {
          name: 'phone',
          placeholder: 'Número do Telefone',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.contact.phones.push(data.phone);
          }
        }
      ]
    }).present();
  }

  removePhone(phone) {
    this.alertCtrl.create({
      title: 'Remover Telefone',
      message: 'Deseja remover o telefone <strong>' + phone + '</strong>?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: data => {
            let index = this.contact.phones.indexOf(phone);
            this.contact.phones.splice(index, 1);
          }
        }
      ]
    }).present();
  }

  addEmail() {
    this.alertCtrl.create({
      title: 'Adicionar Email',
      inputs: [
        {
          name: 'email',
          placeholder: 'Endereço de E-mail',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.contact.emails.push(data.email);
          }
        }
      ]
    }).present();
  }

  removeEmail(email) {
    this.alertCtrl.create({
      title: 'Remover E-mail',
      message: 'Deseja remover o email <strong>' + email + '</strong>?',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: data => {
            let index = this.contact.emails.indexOf(email);
            this.contact.emails.splice(index, 1);
          }
        }
      ]
    }).present();
  }

  getAddressByCurrentLocation() {
    let loading = this.loadingCtrl.create({ content: 'Buscando endereço...' });
    loading.present();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        this.dataProvider.getAddressByLocation(data.coords.latitude, data.coords.longitude)
          .subscribe((res) => {
            loading.dismiss();
            let alert = this.alertCtrl.create();
            alert.setTitle('Selecione seu endereço');

            let i = 0;
            res.results.forEach(address => {
              alert.addInput({
                type: 'radio',
                label: address.formatted_address,
                value: i.toString(),
                checked: false
              });
              i++;
            });

            alert.addButton('Cancelar');
            alert.addButton({
              text: 'OK',
              handler: (index) => {
                this.addGoogleAddress(data.coords.latitude, data.coords.longitude, res.results[index])
              }
            });
            alert.present();
          }, (err) => {
            loading.dismiss();
            this.toastCtrl.create({ message: 'Não foi possível seu endereço', showCloseButton: true, duration: 2000 }).present();
          });
      }, (err) => {
        this.toastCtrl.create({ message: 'Não foi possível obter sua localização', showCloseButton: true, duration: 2000 }).present();
        loading.dismiss();
      });
    } else {
      this.toastCtrl.create({ message: 'Não foi possível obter sua localização', showCloseButton: true, duration: 2000 }).present();
      loading.dismiss();
    }
  }

  addGoogleAddress(latitude, longitude, result) {
    let address: Address = new Address();

    address.latitude = latitude;
    address.longitude = longitude;

    result.address_components.forEach(element => {
      if (element.types.includes('street_number')) {
        address.number = element.short_name;
      }

      if (element.types.includes('route')) {
        address.street = element.short_name;
      }

      if (element.types.includes('route')) {
        address.street = element.short_name;
      }

      if (element.types.includes('sublocality')) {
        address.neighborhood = element.short_name;
      }

      if (element.types.includes('locality')) {
        address.city = element.short_name;
      }

      if (element.types.includes('administrative_area_level_1')) {
        address.state = element.short_name;
      }

      if (element.types.includes('country')) {
        address.country = element.short_name;
      }

      if (element.types.includes('postal_code')) {
        address.zipCode = element.short_name;
      }
    });

    this.contact.addresses.push(address);
  }

  submit() {
    console.clear();
    console.log(this.contact);
  }
}
