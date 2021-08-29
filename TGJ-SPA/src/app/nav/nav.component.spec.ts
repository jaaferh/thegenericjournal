import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TopicService } from '../services/topic.service';
import { of } from 'rxjs';
import { Topic } from '../models/topic.entity';
import { UserService } from '../services/user.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let topicService: TopicService;
  let userService: UserService;
  let toasterService: ToasterService;
  let router: Router;

  const topic: Topic = {
    _id: 'testTopicId',
    name: 'testTopicName'
  };
  const topics: Topic[] = [topic];
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ], // RTM
      providers: [ TopicService, UserService, ToasterService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    topicService = TestBed.inject(TopicService);
    userService = TestBed.inject(UserService);
    toasterService = TestBed.inject(ToasterService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    spyOn(topicService, 'getTopicList').and.returnValue(of(topics));
    component.ngOnInit();
    expect(component.topics).toEqual(topics);
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as Element;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('TGJ-SPA app is running!');
  // });

  it('should set stick variable based on page offset', () => {
    component.checkSticky();
    expect(component.stick).toBeFalsy();

    component.navbarTopOffset = -1;
    component.checkSticky();
    expect(component.stick).toBeTruthy();
  });

  it('should toggle show or hide nav', () => {
    component.showNav = true;
    component.toggleShowNav();
    expect(component.showNav).toBeFalsy();
  });

  it('should log out a user', () => {
    spyOn(userService, 'loggedIn').and.returnValue(true);
    const logout = spyOn(userService, 'logout');
    const pop = spyOn(toasterService, 'pop');
    const navigate = spyOn(router, 'navigate');

    component.logClick();

    expect(logout).toHaveBeenCalled();
    expect(pop).toHaveBeenCalledWith('success', 'Logged Out');
    expect(navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect to /login if not logged in', () => {
    spyOn(userService, 'loggedIn').and.returnValue(false);
    const navigate = spyOn(router, 'navigate');

    component.logClick();

    expect(navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check sticky on scroll', () => {
    // const event = new Event('window:scroll');
    // const container = fixture.debugElement.query(By.css('.scrollWindow'));
    
    // container.triggerEventHandler('scroll', null); 
    // fixture.detectChanges()
    // expect(container.)
  });
});
