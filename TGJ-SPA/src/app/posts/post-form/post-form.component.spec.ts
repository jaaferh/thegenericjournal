/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostFormComponent } from './post-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Topic } from 'src/app/models/topic.entity';
import { Author } from 'src/app/models/author.entity';
import { Post } from 'src/app/models/post.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let route: ActivatedRoute;

  const topics: Topic[] = [];
  const authors: Author[] = [];
  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: {} as Author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true
  };

  const paramMapSpy = {
    get: jasmine.createSpy('get')
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [
        { 
          provide: ActivatedRoute, useValue: { 
            data: of({topics, authors, post}),
            snapshot: { paramMap: paramMapSpy }
          } 
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
