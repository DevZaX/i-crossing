import { Component,ViewChild,ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';

declare var google :any

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef : ElementRef
  map : any

 clientx : any
 clienty : any

  constructor(public navCtrl: NavController,
  private geo:Geolocation,
  public httpClient: HttpClient,
  private toastCtrl: ToastController) {}

  
  
  ionViewDidLoad(){
    this.geo.getCurrentPosition().then((resp) => {
      this.clientx = resp.coords.latitude
      this.clienty = resp.coords.longitude
        this.showMap(resp.coords.latitude,resp.coords.longitude)
        this.test(resp);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  test(resp){

    this.httpClient.get<any[]>('assets/data1.json').subscribe(data=>{
      data = data[0]
      data.forEach(element => {
        var point = element.Point.coordinates;
        var point = point.split(',');
        var x = +point[0];
        var y = +point[1];
        var l1 = {latitude:y,longitude:x}
        var l2 = {latitude:resp.coords.latitude,longitude:resp.coords.longitude}
        if(this.getDistance(l2,l2) < 50){
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/redcrossing.png');
        }else{
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/greencrossing.png');
        }
      });
     
    })

    this.httpClient.get<any[]>('assets/data2.json').subscribe(data=>{
      data = data[0]
      data.forEach(element => {
        var point = element.Point.coordinates;
        var point = point.split(',');
        var x = +point[0];
        var y = +point[1];
        var l1 = {latitude:y,longitude:x}
        var l2 = {latitude:resp.coords.latitude,longitude:resp.coords.longitude}
        if(this.getDistance(l2,l2) < 50){
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/redcrossing.png');
        }else{
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/greencrossing.png');
        }
      });
    })

    this.httpClient.get<any[]>('assets/data2.json').subscribe(data=>{
      data = data[0]
      data.forEach(element => {
        var point = element.Point.coordinates;
        var point = point.split(',');
        var x = +point[0];
        var y = +point[1];
        var l1 = {latitude:y,longitude:x}
        var l2 = {latitude:resp.coords.latitude,longitude:resp.coords.longitude}
        if(this.getDistance(l2,l2) < 50){
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/redcrossing.png');
        }else{
          this.addMarkerWithIcon(new google.maps.LatLng(y,x),this.map,'assets/imgs/greencrossing.png');
        }
      });
    })
  }

  showMap(x,y){
    //location
    const location = new google.maps.LatLng(x,y);
    //options
    const options = {
      center : location,
      zoom : 17
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarker(location,this.map);
  }

  addMarker(position,map){
    return new google.maps.Marker({position,map});
  }

  addMarkerWithIcon(position,map,icon){
    return new google.maps.Marker({position,map,icon:icon});
  }

  getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.latitude - p1.latitude);
    var dLong = this.rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

  rad = function(x) {
    return x * Math.PI / 180;
  };

  sendAlert(){

    console.log(this.clientx)

    console.log(':')

    console.log(this.clienty)

    

    let toast = this.toastCtrl.create({
      message: 'Alert send successfully',
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
