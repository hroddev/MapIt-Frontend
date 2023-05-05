import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MapRoutingModule } from './map-routing.module';

@NgModule({
  declarations: [
    MapComponent,
    SearchBarComponent,

  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    MapRoutingModule,
  ],
  exports: [
    RouterModule
  ]
})
export class MapModule { }
