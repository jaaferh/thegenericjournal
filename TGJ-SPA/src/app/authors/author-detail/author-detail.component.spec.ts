/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthorDetailComponent } from './author-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthorDetailComponent', () => {
  let component: AuthorDetailComponent;
  let fixture: ComponentFixture<AuthorDetailComponent>;

  const authorDetail: AuthorDetails = {
    author: {} as Author,
    author_posts: []
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ AuthorDetailComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule, RouterTestingModule ], // RTM
      providers: [ 
        { provide: ActivatedRoute, useValue: { data: of({authorDetail}) } },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
