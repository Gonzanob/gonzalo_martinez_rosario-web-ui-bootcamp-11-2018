import { Component, OnInit } from '@angular/core';
import { SpotiapiService } from '../spotiapi.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  constructor(private spotiapi: SpotiapiService) { }

  logged: boolean;

  areWeLogged(): void {
    this.spotiapi.areWeLoggedIn()
      .subscribe((result: boolean) => {
        this.logged = result;
      });
  }

  ngOnInit() {
    this.logged = false;
    this.areWeLogged();
  }

}
