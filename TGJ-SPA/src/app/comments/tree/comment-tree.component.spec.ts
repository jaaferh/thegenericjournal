/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CommentTreeComponent } from './comment-tree.component';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CommentTreeComponent', () => {
  let component: CommentTreeComponent;
  let fixture: ComponentFixture<CommentTreeComponent>;

  const commentSpy = {
    like: jasmine.createSpy('like'),
    dislike: jasmine.createSpy('dislike'),
    updateComment: jasmine.createSpy('updateComment'),
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ CommentTreeComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: CommentService, useValue: commentSpy },
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
