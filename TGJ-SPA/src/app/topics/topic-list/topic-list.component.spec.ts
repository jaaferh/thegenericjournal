/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicListComponent } from './topic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopicsPosts } from 'src/app/models/topic.entity';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;
  
  const topicsPosts: TopicsPosts = { posts: [], topics: []};


  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ TopicListComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({topicsPosts}) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
