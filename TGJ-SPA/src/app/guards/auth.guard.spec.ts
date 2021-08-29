import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToasterService } from 'angular2-toaster';
import { UserService } from '../services/user.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userService: UserService;

  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  const toasterSpy = { pop: jasmine.createSpy('pop') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ UserService, { provide: ToasterService, useValue: toasterSpy }, 
        { provide: Router, useValue: routerSpy } ]
    });
    guard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow route if user is logged in', () => {
    spyOn(userService, 'loggedIn').and.returnValue(true); 
    expect(guard.canActivate()).toBeTruthy();
  });

  it('should deny route if user is not logged in, pop a toast and redirect to login', () => {
    spyOn(userService, 'loggedIn').and.returnValue(false); 

    expect(guard.canActivate()).toBeFalsy();
    expect(toasterSpy.pop).toHaveBeenCalledWith('error', 'Not Logged In');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
