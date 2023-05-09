import { Component, OnInit, ViewChild } from '@angular/core';
import { mapService } from '../map.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GoogleMap, MapAnchorPoint, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  @ViewChild('googleMap', { static: false })  map!: GoogleMap;
  //@ViewChild('infoWindow',  { static: false })  info!: MapInfoWindow;
  @ViewChild(MapInfoWindow, { static: false })info!: MapInfoWindow;

  infoContent ='click'

  apiLoaded: Observable<boolean>;

  center={lat: 40.41, lng: -3.7};
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: any[] = [];


  //coordinates= {lat: 50, lng: 14}; 
  display?: google.maps.LatLngLiteral = {lat: 40.41, lng: -3.7}; //coordenadas iniciales se deben sustituir por la ubicación del usuario si disponemos de ella

  constructor(private httpClient: HttpClient, private mapServ: mapService){
    this.apiLoaded = this.httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.googleAPIKey}`, 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(){
    this.setMarkers();
   
  }

//*******************eventos de ratón************************/
  moveMap(event: google.maps.MapMouseEvent) {
    console.log(event)
    this.center = (event?.latLng?.toJSON()) || this.center;
    this.setMarkers();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event?.latLng?.toJSON();
   
  }

  //*********************markers**********************************/
  setMarkers(){
    
    this.markerPositions=[]
    this.mapServ.getMap(this.display).subscribe({ 
      next:  (data)=> Object.entries(data).map((elem: any) => {elem.map((e: any) => {this.markerPositions.push(e as google.maps.Marker)})
      })
     })

     console.log(this.markerPositions)
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event?.latLng?.toJSON()){
    this.markerPositions.push(event.latLng.toJSON());}
  }

  infoPosition(marker: any){
    console.log(marker)
  
    
  }

 
  infoE(marker: any){
    console.log("clic")
  
    console.log(this.info)
   
    this.info.open(
      marker     
    )
  }

}

 



