import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  constructor(public http: Http) {

  }

  getAddressByLocation(latitude, longitude) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true').map((res: Response) => res.json());
  }

  getAddress(address) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&sensor=true').map((res: Response) => res.json());
  }
}
