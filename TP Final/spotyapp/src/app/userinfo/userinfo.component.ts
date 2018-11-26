import { Component, OnInit } from '@angular/core';
import { SpotiapiService } from '../spotiapi.service';
import { user_object } from '../user_object';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(private spotiapi: SpotiapiService) { }

  logged: boolean;
  user_info: user_object | null;

  areWeLogged(): void {
    this.spotiapi.areWeLoggedIn()
      .subscribe((result: boolean) => {
        this.logged = result;
      });
  }

  getUserInfo(): void {
    this.spotiapi.getUserInfo()
      .subscribe((result: user_object | null) => {
        this.user_info = result;
      });
  }


  ngOnInit() {
    this.logged = false;
    this.user_info = null;
    this.areWeLogged();
    this.getUserInfo();
  }

}
