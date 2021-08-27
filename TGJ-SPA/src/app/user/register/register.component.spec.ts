import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToasterService } from 'angular2-toaster';
import { EMPTY, from, Observable, of, throwError } from 'rxjs';
import { Register } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let router: Router;

  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]), FormsModule ], // need to flesh out RTM
      providers: [ 
        { provide: ToasterService, useValue: toasterSpy },
        UserService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a user on submit then navigate to the login page', () => {
    const register: Register = {
      first_name: 'affendim',
      family_name: 'pasha',
      date_of_birth: new Date('2021-08-13'),
      password: 'testpass123',
      confirm_pass: 'testpass123',
      email: 'testemail@email.com'
    };
    component.register = register;

    // returnValue must be of<any>({}) for Observable<void> for next (subscribe innards) to be called;
    const spy = spyOn(userService, 'registerUser').and.returnValue(of<any>({}));
    const navigateSpy = spyOn(router, 'navigate');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Successfully Registered. Please Log In');
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);

  });

  it('should toast an error when register fails', () => {
    const register: Register = {
      first_name: 'affendim',
      family_name: 'pasha',
      date_of_birth: new Date('2021-08-13'),
      password: 'testpass123',
      confirm_pass: 'testpass123',
      email: 'testemail@email.com'
    };
    component.register = register;

    const spy = spyOn(userService, 'registerUser').and.returnValue(throwError({status: 404}));

    component.onSubmit();

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));

  });

  it('should set the date of birth on date change', () => {
    expect(component.register.date_of_birth).toBeFalsy();
    component.dateChange('2021-08-13');
    expect(component.register.date_of_birth).toBeTruthy();
  });
});
