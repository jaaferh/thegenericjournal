import { Component, NgModule, OnInit } from '@angular/core';
import { ToasterService, ToasterModule } from 'angular2-toaster';
import { User } from './models/user.entity';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TGJ-SPA';
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as User;
    if (user)
      this.userService.currentUser = user;
  }
}
