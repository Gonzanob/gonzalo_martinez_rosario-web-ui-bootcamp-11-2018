import { Component, OnInit, Input } from '@angular/core';
import { draw_interface } from '../draw_interface';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  constructor() { }
  
  not_found_url: string = "assets/playlist_resources/not_found.png";

  @Input() to_draw: draw_interface | null;

  ngOnInit() {

  }

}
