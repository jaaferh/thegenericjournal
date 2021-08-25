/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthorFormComponent } from './author-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('AuthorFormComponent', () => {
  let component: AuthorFormComponent;
  let fixture: ComponentFixture<AuthorFormComponent>;

  const paramMapSpy = {
    get: jasmine.createSpy('get')
  };


  const authorDetail: AuthorDetails = {
    author: {} as Author,
    author_posts: []
  };
  

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ AuthorFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [ 
        { 
          provide: ActivatedRoute, useValue: { 
            data: of({authorDetail}),
            snapshot: { paramMap: paramMapSpy }
          } 
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
