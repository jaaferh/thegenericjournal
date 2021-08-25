/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostDetailComponent } from './post-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post.entity';
import { Author } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: {} as Author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ], // need to flesh out RTM
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({post})} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
