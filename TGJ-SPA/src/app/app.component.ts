import { Component, NgModule } from '@angular/core';
import { ToasterService, ToasterModule } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TGJ-SPA';
}
