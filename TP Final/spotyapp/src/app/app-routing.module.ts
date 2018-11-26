import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistListComponent } from './playlist-list/playlist-list.component'
import { SearchComponent } from './search/search.component';
import { UserinfoComponent } from './userinfo/userinfo.component';


const routes: Routes = [
  { path: '', redirectTo: '/userinfo', pathMatch: 'full'},
  { path: 'playlist', component: PlaylistListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'userinfo', component: UserinfoComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
