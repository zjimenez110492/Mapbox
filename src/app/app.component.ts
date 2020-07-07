import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  mapa: Mapboxgl.Map;
  ngOnInit(): void 
  {
    (Mapboxgl as any).accessToken = environment.mapboxkey;
   this.mapa = new Mapboxgl.Map({
    container: 'mapa-mapbox', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-76.964774, 1.836112 ], // starting position    1.836112, -76.964774
    zoom: 2000 // starting zoom
}); 
    this.crearMarcador(-76.964774, 1.836112 );
  }
  title = 'mapboxApp';
  crearMarcador(lng: number, lat:number)
  {
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
      marker.on('drag',()=>{
        console.log(marker.getLngLat());
      });
  }
  

}
