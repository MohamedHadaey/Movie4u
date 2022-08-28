import { Component } from '@angular/core';
import disableDevtool from 'disable-devtool';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';
  constructor(){
    disableDevtool();
  }
}
