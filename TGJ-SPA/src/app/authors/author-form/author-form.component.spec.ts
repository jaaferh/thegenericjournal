import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorFormComponent, Mode } from './author-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { AuthorService } from 'src/app/services/author.service';
import { Location } from '@angular/common';

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  let authorService: AuthorService;
  let router: Router;
  let location: Location;

  const paramMapSpy = {
    get: jasmine.createSpy('get')
  };
  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };
  const authorDetail: AuthorDetails = {
    author: {} as Author,
    author_posts: []
  };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ 
        { 
          provide: ActivatedRoute, useValue: { 
            data: of({authorDetail}),
            snapshot: { paramMap: paramMapSpy }
          } 
        },
        {
          provide: ToasterService, useValue: toasterSpy
        },
        AuthorService,
        Location
      ]
    })
    .compileComponents();
  });

  it('should create and run Edit mode', () => {
    paramMapSpy.get.and.returnValue('idtest');
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.id).toEqual('idtest');
    expect(component.mode).toEqual(Mode.Edit);

    expect(component.author).toEqual(authorDetail.author);
  });

  it('should create and run Create mode', () => {
    paramMapSpy.get.and.returnValue('');
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.id).toEqual('');
    expect(component.mode).toEqual(Mode.Create);

    expect(component.author.pic_url).toEqual('http://res.cloudinary.com/soqudu/image/upload/v1621168850/xyniooa0hep6j8eeboin.png');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authorService = TestBed.inject(AuthorService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should apply the authors date on date change', () => {
    component.dateChange('1985-03-05');
    expect(component.author.date_of_birth).toEqual(new Date('1985-03-05'));

    component.dateChange('');
    expect();
  });

  it('should set the authors picture url on request', () => {
    component.getUploadedUrl('imgurl');
    expect(component.author.pic_url).toEqual('imgurl');
  });

  it('should submit a new author if in Create mode', () => {
    component.mode = Mode.Create;
    const newAuthor: Author = {
      _id: 'testid',
      first_name: 'testfname',
      family_name: 'testlname',
      date_of_birth: new Date('1986-03-04'),
      bio: 'testbio',
      date_joined: new Date()
    };
    const createAuthor = spyOn(authorService, 'createAuthor').and.returnValue(of(newAuthor));
    const navigate = spyOn(router, 'navigate');

    component.onSubmit();

    expect(createAuthor).toHaveBeenCalledWith(component.author);
    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Author Created Successfully');
    expect(navigate).toHaveBeenCalledWith(['/author', newAuthor._id]);
  });
  
  it('should pop a toaster on error on submit in Create mode', () => {
    component.mode = Mode.Create;
    spyOn(authorService, 'createAuthor').and.returnValue(throwError({status: 404}));
    
    component.onSubmit();

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should update the current author if in Edit mode', () => {
    component.mode = Mode.Edit;
    component.id = 'testid';
    const updateAuthor = spyOn(authorService, 'updateAuthor').and.returnValue(of<any>({}));
    const navigate = spyOn(router, 'navigate');

    component.onSubmit();

    expect(updateAuthor).toHaveBeenCalledWith(component.id, component.author);
    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Author Updated Successfully');
    expect(navigate).toHaveBeenCalledWith(['/author', component.id]);

    component.id = '';
    component.onSubmit();
    expect();
  });

  it('should pop a toaster on error on submit in Edit mode', () => {
    component.mode = Mode.Edit;
    component.id = 'test';
    spyOn(authorService, 'updateAuthor').and.returnValue(throwError({status: 404}));
    
    component.onSubmit();

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should navigate back to all authors when Cancel is clicked', () => {
    const back = spyOn(location, 'back');

    component.navigateAuthors();

    expect(back).toHaveBeenCalled();
  });

});



describe('AuthorFormComponent Server Error', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;
  const paramMapSpy = {
    get: jasmine.createSpy('get')
  };
  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ 
        { 
          provide: ActivatedRoute, useValue: { 
            data: throwError({status: 404}),
            snapshot: { paramMap: paramMapSpy }
          } 
        },
        {
          provide: ToasterService, useValue: toasterSpy
        }

      ]
    })
    .compileComponents();
  });

  it('should create and run Edit mode', () => {
    paramMapSpy.get.and.returnValue('idtest');
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.id).toEqual('idtest');
    expect(component.mode).toEqual(Mode.Edit);

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });
});
