import { Component, OnInit } from '@angular/core';
import { playlist_simple } from '../playlist_simple';
import { SpotiapiService } from '../spotiapi.service';
import { draw_interface } from '../draw_interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  constructor(private spotiapi: SpotiapiService,
              private sanitizer: DomSanitizer) { }

  playlist: playlist_simple[];
  to_draw: draw_interface[];
  selected: draw_interface;
  not_found_url: string = "assets/playlist_resources/not_found.png";
  url: SafeResourceUrl;

  parse_playlist(received: playlist_simple[]): void {
    for( var key in received){
      if(received.hasOwnProperty(key))
      {
        this.to_draw.push( {
          "name" : received[key].name,
          "images" : received[key].images,
          "external_urls" : received[key].external_urls
        });
      }
    }
  }

  select(to_select: draw_interface): void {
    this.selected = to_select;
    this.selected.external_urls["spotify"] = this.selected.external_urls["spotify"].slice(24);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed' + this.selected.external_urls['spotify'])
  }

  getPlaylists(): void {
    this.spotiapi.getPlaylists()
      .subscribe(playlists => {
        this.playlist = playlists
        this.parse_playlist(this.playlist);
      });
  }

  ngOnInit() {
    this.selected = null;
    this.playlist = [];
    this.to_draw = [];
    this.url = null;
    this.getPlaylists();
  }

}
