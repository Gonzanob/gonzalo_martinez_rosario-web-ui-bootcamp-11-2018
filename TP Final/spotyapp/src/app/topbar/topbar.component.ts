import { Component, OnInit } from '@angular/core';
import { SpotiapiService } from '../spotiapi.service';
import { Router } from '@angular/router';
import { user_object } from '../user_object';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private spotiapi: SpotiapiService) { }

  logged: boolean;

  areWeLogged(): void {
    this.spotiapi.areWeLoggedIn()
      .subscribe((result: boolean) => {
        this.logged = result;
      }

      )
  }

  ngOnInit() {
    this.areWeLogged();
    
  }

}
