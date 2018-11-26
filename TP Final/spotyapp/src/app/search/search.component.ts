import { Component, OnInit, Input } from '@angular/core';
import { SpotiapiService } from '../spotiapi.service';
import { search_interface } from '../search_interface';
import { Paging_Object } from '../paging_object';
import { draw_interface } from '../draw_interface';
import { track_object } from '../track_object';
import { album_simplified_object } from '../album_simplified_object';
import { artist_object } from '../artist_object';
import { playlist_simple } from '../playlist_simple';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private spotiapi: SpotiapiService) { }

  logged: boolean;
  to_search: search_interface;
  //to_draw: draw_interface[];
  history: search_interface[];
  showed_types: string[];

  to_draw2: draw_interface[][];

  areWeLogged(): void {
    this.spotiapi.areWeLoggedIn()
      .subscribe((result: boolean) => {
        this.logged = result;
      }

      )
  }

  private getLastSearched(): void {
    this.spotiapi.getLastSearched()
      .subscribe(result => {
        this.history = result;
      });
  }

  update_fields(input: search_interface) {
    this.to_search = {
      "album": input.album,
      "artist": input.artist,
      "playlist": input.playlist,
      "text": input.text,
      "track": input.track
    }
  }

  private parse_received(received: Paging_Object[]) {
    var i: number = 0;
    var j: number = 0;
    var type: string= '';
    for( var key in received){
      if(received.hasOwnProperty(key))
      {
        for(var key2 in received[key].items)
          if(received[key].items.hasOwnProperty(key2))
          {
            
            let actual_type: string = received[key].items[key2].type;

            if(i >= 5) {
              j++;
              i = 0;
              type = actual_type;
              this.showed_types.push(actual_type);  
            }
            if(type === '')
            {
              type = actual_type;
              this.showed_types.push(actual_type);
            }
            if(type !== actual_type)
            {
              type = actual_type;
              this.showed_types.push(actual_type);
              j++;
              i = 0;
            }
            if(!this.to_draw2[j]) {
              this.to_draw2[j] = [];
            }

            this.to_draw2[j].push({
              "name" : received[key].items[key2].name,
              "images" : (received[key].items[key2].type === "track") ? (<track_object>received[key].items[key2]).album.images : (<album_simplified_object | artist_object | playlist_simple>received[key].items[key2]).images,
              "external_urls": received[key].items[key2].external_urls
            });
            i++;
            
          }
      }
    }
  }

  search() {
    if(this.to_search.album || this.to_search.playlist || this.to_search.track || this.to_search.artist ) {
      if(this.to_search.text !== '' ) {
        this.spotiapi.search(this.to_search)
          .subscribe(search => {
            //this.to_draw = [];
            this.to_draw2 = [];
            this.showed_types = [];
            this.parse_received(search);
          });
      }
      else { alert("Type something to search")}
    }
    else { alert("Select some filter")}

  }

  ngOnInit() {
    this.to_search = {
      text: '',
      playlist: false,
      artist: false,
      album: false,
      track: false
    }
    //this.to_draw = [];
    this.logged = false;
    this.to_draw2 = [];
    this.getLastSearched();
    this.showed_types = [];
    this.areWeLogged();
  }
}
