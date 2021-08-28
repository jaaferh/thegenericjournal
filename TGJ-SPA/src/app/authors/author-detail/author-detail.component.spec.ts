/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailComponent } from './author-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { ToasterService } from 'angular2-toaster';
import { AuthorService } from 'src/app/services/author.service';

describe('AuthorDetailComponent', () => {
  let component: AuthorDetailComponent;
  let fixture: ComponentFixture<AuthorDetailComponent>;
  let toaster: ToasterService;
  let authorService: AuthorService;
  let router: Router;

  const authorDetail: AuthorDetails = {
    author: {
      _id: 'testid',
      first_name: 'testfname',
      family_name: 'testlname',
      date_of_birth: new Date('1986-03-04'),
      bio: 'testbio',
      date_joined: new Date()
    } as Author,
    author_posts: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule, RouterTestingModule ], // RTM
      providers: [ 
        { provide: ActivatedRoute, useValue: { data: of({authorDetail}) } },
        ToasterService,
        AuthorService,
        
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toaster = TestBed.inject(ToasterService);
    authorService = TestBed.inject(AuthorService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete author', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteAuthor = spyOn(authorService, 'deleteAuthor').and.returnValue(of<any>({}));
    const pop = spyOn(toaster, 'pop');
    const navigate = spyOn(router, 'navigate');

    component.deleteAuthor('id');

    expect(deleteAuthor).toHaveBeenCalled();
    expect(pop).toHaveBeenCalledWith('success', 'Author Deleted Successfully');
    expect(navigate).toHaveBeenCalledWith(['/authors']);
  });

  it('should pop an error on author delete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteAuthor = spyOn(authorService, 'deleteAuthor').and.returnValue(throwError({status: 404}));
    const pop = spyOn(toaster, 'pop');

    component.deleteAuthor('id');

    expect(deleteAuthor).toHaveBeenCalled();
    expect(pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should do nothing on delete when confirm is denied', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteAuthor('id');

    expect();
  });

  // it('should calculate age of author', () => {
  //   component.authorDetails.author.date_of_birth = new Date('1986-02-04');
  //   component
  // })
});

describe('AuthorDetailComponent Server fail', () => {
  let component: AuthorDetailComponent;
  let fixture: ComponentFixture<AuthorDetailComponent>;
  let toaster: ToasterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule, RouterTestingModule ], // RTM
      providers: [ 
        { provide: ActivatedRoute, useValue: { data: throwError({ status: 404}) } },
        ToasterService
       ]
    })
    .compileComponents();
  });

  it('should create', () => {
    toaster = TestBed.inject(ToasterService);
    const pop = spyOn(toaster, 'pop');

    fixture = TestBed.createComponent(AuthorDetailComponent);
    component = fixture.componentInstance;
    
    component.authorDetails = {
      author: {} as Author,
      author_posts: []
    };
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(pop).toHaveBeenCalledWith('error', Object({ status: 404}));
  });
});