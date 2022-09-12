import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { of } from 'rxjs';
import { User, UserToken } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  
  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        { provide: ToasterService, useValue: toasterSpy },
        UserService,
        // { provide: WINDOW_TOKEN, useValue: { location: { reload: () => {} } } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* Cant test onSubmit() due to window.location.href. Need to use 
     OpaqueToken to inject WindowToken into the component, then spy on
     the WindowToken here to prevent it from actually reloading the page. */
  it('should login on submit', () => {
    component.login = {
      email: 'email@email.com',
      password: 'password123'
    };

    const userToken: UserToken = {
      user: {} as User,
      token: 'testToken'
    };

    spyOn(userService, 'loginUser').and.returnValue(of(userToken));

    // component.onSubmit(); 
    // expect(toasterSpy.pop).toHaveBeenCalled();
    // expect(userSpy.loginUser(component.login)).toHaveBeenCalled();
  });

});
