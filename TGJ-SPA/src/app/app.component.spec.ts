import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Author } from './models/author.entity';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let userService: UserService;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    userService = TestBed.inject(UserService);
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app and check if logged in', () => {
    const getItem = spyOn(window.localStorage, 'getItem').and.callFake(function() {
      return JSON.stringify({email: 'testemail', author: {} as Author});
    });
    spyOn(userService, 'loggedIn').and.returnValue(true);

    app.ngOnInit();

    expect(app).toBeTruthy();
    expect(getItem).toHaveBeenCalled();
    expect(userService.currentUser).toEqual({email: 'testemail', author: {} as Author});
  });

  it('should do nothing if not logged in', () => {
    spyOn(userService, 'loggedIn').and.returnValue(false);

    app.ngOnInit();

    expect();
  });

  it(`should have as title 'TGJ-SPA'`, () => {
    expect(app.title).toEqual('TGJ-SPA');
  });

});
