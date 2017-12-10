import { Component } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CropPicturePage } from '../crop-picture/crop-picture';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-take-picture',
  templateUrl: 'take-picture.html',
})
export class TakePicturePage {
  constructor(private alertCtrl: AlertController, private viewCtrl: ViewController, private toastCtrl: ToastController, private modalCtrl: ModalController) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    this.loadVideo();
  }

  loadVideo() {
    var video = <any>document.getElementById('video');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1 } })
        .then(function (stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
        }).catch((err) => {
          this.toastCtrl.create({ message: 'Falha ao abrir a câmera', showCloseButton: true, duration: 2000 }).present();
        });
    } else {
      this.toastCtrl.create({ message: 'Este dispositivo não suporta uso de câmera', showCloseButton: true, duration: 2000 }).present();
    }
  }

  takePicture() {
    var video = <any>document.getElementById('video');
    var canvas = <any>document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, 200, 200);

    this.alertCtrl.create({
      title: "Deseja recortar a imagem?",
      message: "<p text-center><img src='" + canvas.toDataURL() + "' class='profile-picture camera-photo' /></p>",
      buttons: [
        {
          text: 'Não',
          handler: data => {
            this.viewCtrl.dismiss(canvas.toDataURL());
          }
        },
        {
          text: 'Sim',
          handler: data => {
            let modal = this.modalCtrl.create(CropPicturePage, { picture: canvas.toDataURL() });
            modal.present();

            modal.onDidDismiss(data => {
              if (data) {
                this.viewCtrl.dismiss(data);
              }
            });
          }
        }
      ]
    }).present();
  }
}
