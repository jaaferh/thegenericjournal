import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Topic } from '../models/topic.entity';
import { User } from '../models/user.entity';
import { TopicService } from '../services/topic.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;
  @HostListener('window:scroll', ['$event'])
    scrollHandler(event: any) {
      this.checkSticky();
    }
  stick = false;
  showNav = true;
  navbarTopOffset = 0;
  topics: Topic[] = []
  postSearch = '';
  currentUser = {} as User;

  constructor(
    private topicService: TopicService,
    private userService: UserService,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.topicService.getTopicList().subscribe(tl => {
      this.topics = tl;
    });
  }

  ngAfterViewInit(): void {
    const navBarNativElement = this.navbar.nativeElement as Element;
    this.navbarTopOffset = navBarNativElement.getBoundingClientRect().top;  
  }

  checkSticky(): void {
    this.stick = window.pageYOffset > this.navbarTopOffset ? true : false;
  }

  toggleShowNav(): void {
    this.showNav = !this.showNav;
  }

  loggedIn(): boolean {
    return this.userService.loggedIn();
  }

  logClick(): void {
    const logged = this.loggedIn();
    if (logged) {
      this.userService.logout();
      this.toaster.pop('success', 'Logged Out');
      void this.router.navigate(['/']);
    }

    void this.router.navigate(['/login']);
  }
}
