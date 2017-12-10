import { Component } from '@angular/core';
import { ViewController, LoadingController, ModalController } from 'ionic-angular';
import { CropPicturePage } from '../crop-picture/crop-picture';

@Component({
  selector: 'page-upload-picture',
  templateUrl: 'upload-picture.html',
})
export class UploadPicturePage {
  public image: string = null;

  constructor(private modalCtrl: ModalController, private viewCtrl: ViewController, private loadingCtrl: LoadingController) {

  }

  fileChangeListener($event) {
    let loading = this.loadingCtrl.create({ content: 'Carregando...' });
    loading.present();

    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      that.image = loadEvent.target.result;
      loading.dismiss();
    };

    myReader.readAsDataURL(file);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    let loading = this.loadingCtrl.create({ content: 'Carregando...' });
    loading.present();

    let modal = this.modalCtrl.create(CropPicturePage, { picture: this.image });
    modal.present();

    modal.onDidDismiss(data => {
      if (data) {
        this.viewCtrl.dismiss(data);
      }
    });
    loading.dismiss();
  }
}
