/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostListComponent } from './post-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post.entity';
import { Topic } from 'src/app/models/topic.entity';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  const posts: Post[] = [];
  const topics: Topic[] = [];

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ PostListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ], // RTM
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            data: of({posts, topics}), 
            snapshot: { queryParams: { topicName: '', searchParam: '' } }
          } 
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
