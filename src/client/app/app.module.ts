import { NgModule }      from '@angular/core';
import { NgStyle } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodosComponent } from './components/todos/todos.component';
import { FriendComponent } from './components/friend/friend.component';


import {Auth} from './services/auth/auth.service';
import {TodoService} from './services/todo/todo.service';
import {FriendService} from './services/friend/friend.service';
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [ BrowserModule, routing, HttpModule ],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, TodosComponent, FriendComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard,
    TodoService,
    FriendService
  ]
})
export class AppModule { }
