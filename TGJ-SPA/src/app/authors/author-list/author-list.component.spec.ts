import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListComponent } from './author-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Author, AuthorsPosts } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToasterService } from 'angular2-toaster';
import { Post } from 'src/app/models/post.entity';
import { AuthorService } from 'src/app/services/author.service';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let authorService: AuthorService;
  let router: Router;

  const author: Author = {
    _id: 'testid',
    first_name: 'testfname',
    family_name: 'testlname',
    date_of_birth: new Date('1986-03-04'),
    bio: 'testbio',
    date_joined: new Date()
  };

  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true,
    comments: []
  };
  const authorsPosts: AuthorsPosts = {
    authors: [author],
    posts: [post]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({authorsPosts}) } },
        AuthorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authorService = TestBed.inject(AuthorService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.allAuthorsPosts).toEqual(authorsPosts);
    expect(component.authorsPosts).toEqual(component.allAuthorsPosts);
  });

  it('should get post count', () => {
    expect(component.getPostCount(author)).toEqual(1);
  });

  it('should search for authors on key up', () => {
    const searchedAuthor: Author = {
      _id: 'testid2',
      first_name: 'testfname2',
      family_name: 'testlname2',
      date_of_birth: new Date('1987-03-04'),
      bio: 'testbio2',
      date_joined: new Date()
    };
    const keyUp = new KeyboardEvent('keyup');
    const authorSearch = spyOn(authorService, 'authorSearch').and.returnValue(of([searchedAuthor]));

    component.searchParam = 'test';
    component.keyUpFunction(keyUp);

    expect(authorSearch).toHaveBeenCalled();
    expect(component.authorsPosts.authors).toEqual([searchedAuthor]);
    expect(component.searchEmpty).toBeFalsy();

  });

  it('should reshow all authors on empty search', () => {
    const keyUp = new KeyboardEvent('keyup');

    component.searchParam = '';
    component.searchEmpty = false;
    component.keyUpFunction(keyUp);

    expect(component.authorsPosts.authors).toEqual(component.allAuthorsPosts.authors);

    component.searchEmpty = true;
    component.keyUpFunction(keyUp);
    expect();
  });

  it('should route to author on click', () => {
    const navigate = spyOn(router, 'navigate');

    component.routeToAuthor('testid');

    expect(navigate).toHaveBeenCalledWith(['/author', 'testid']);
  });
});



describe('AuthorListComponent Server Error', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;
  let toaster: ToasterService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: throwError({status: 404}) } },
        ToasterService
      ]
    })
    .compileComponents();
  });

  it('should pop and error if resolver fails', () => {
    toaster = TestBed.inject(ToasterService);
    const pop = spyOn(toaster, 'pop');

    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(pop).toHaveBeenCalledWith('error', Object({ status: 404}));
  });
});