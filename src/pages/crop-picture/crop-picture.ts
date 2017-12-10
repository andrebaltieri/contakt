import { Component, ViewChild } from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-crop-picture',
  templateUrl: 'crop-picture.html',
})
export class CropPicturePage {
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  cropperSettings: CropperSettings;
  data: any;
  imgData: string = '';

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 350;
    this.cropperSettings.height = 350;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 350;
    this.cropperSettings.canvasHeight = 350;
    this.cropperSettings.rounded = true

    this.data = {};
    this.imgData = this.navParams.get('picture');
  }

  ionViewDidLoad() {
    var image: any = new Image();
    image.src = this.imgData;
    this.cropper.setImage(image);
  }

  submit() {
    this.viewCtrl.dismiss(this.data.image);
  }
}
