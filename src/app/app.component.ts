import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public mapa: Mapboxgl.Map;
  toggleableLayerIds = ['contours', 'museums'];
  visibilityMuseums='visible';
  visibilityContours='visible';
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
      /* marker.on('drag',()=>{
        console.log(marker.getLngLat());
      }); */


      this.mapa.on('load', () => 
      {
        console.log("EJECUTANDO LOAD");
        // add source and layer for museums
        this.mapa.addSource('museums', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
        });
      });
      this.nueva();
    }
    
    nueva()
    {
        environment.mapboxkey = 'pk.eyJ1IjoiemppbWVuZXoxMTA0OTIiLCJhIjoiY2tjYjZ0ODN2MW9lODJwcXBrazQ4OGV6NCJ9.cNCdINZSFSqVhUSXZIBGTA';
        var map = new Mapboxgl.Map({
          container: 'mapa-mapbox',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 15,
          center: [-76.964774, 1.836112 ]
        });
         
        map.on('load', function() {
        // add source and layer for museums
        map.addSource('museums', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
        });
        map.addLayer({
        'id': 'museums',
        'type': 'circle',
        'source': 'museums',
        'layout': {
        // make layer visible by default
        'visibility': 'visible'
        },
        'paint': {
        'circle-radius': 8,
        'circle-color': 'rgba(55,148,179,1)'
        },
        'source-layer': 'museum-cusco'
        });
         
        // add source and layer for contours
        map.addSource('contours', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
        });
        map.addLayer({
        'id': 'contours',
        'type': 'line',
        'source': 'contours',
        'source-layer': 'contour',
        'layout': {
        // make layer visible by default
        'visibility': 'visible',
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#877b59',
        'line-width': 1
        }
        });
        });
         
        // enumerate ids of the layers
        var toggleableLayerIds = ['contours', 'museums'];
         
        // set up the corresponding toggle button for each layer
        for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];
         
        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;
         
        link.onclick = function(e) {
        var clickedLayer = document.documentElement.textContent;
        e.preventDefault();
        e.stopPropagation();
         
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
         
        // toggle layer visibility by changing the layout object's visibility property
        if (visibility === 'visible') {
        map.setLayoutProperty(clickedLayer, 'visibility', 'none');
        document.documentElement.className = '';
        } else {
          document.documentElement.className = 'active';
        map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
        };
         
        var layers = document.getElementById('menu');
        layers.appendChild(link);
        }

    }
    
}
