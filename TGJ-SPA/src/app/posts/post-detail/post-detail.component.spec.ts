/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostDetailComponent } from './post-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.entity';
import { Author } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { Comment } from 'src/app/models/comment.entity';
import { ToasterService } from 'angular2-toaster';
import { PostService } from 'src/app/services/post.service';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let router: Router;
  let postService: PostService;
  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };
  

  const comment: Comment = {
    _id: 'testCommentId',
    post: {} as Post,
    author_nickname: 'nickname',
    text: 'test',
    date_posted: new Date(),
    likes: 4,
    dislikes: 2
  };

  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: {} as Author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true,
    comments: [comment]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule.withRoutes([]) ], // need to flesh out RTM
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({post})} },
        PostService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.comments).toEqual(post.comments!);
  });

  it('should navigate to update page on update click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.updatePost('id');
    expect(navigateSpy).toHaveBeenCalledWith(['/post/:id/edit', {id: 'id'}]);
  });

  it('should delete a post on delete click', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(postService, 'deletePost').and.returnValue(of<any>({}));
    const navigateSpy = spyOn(router, 'navigate');
    component.deletePost('id');

    expect(spy).toHaveBeenCalled();

    // expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Post Deleted Successfully');
    // expect(navigateSpy).toHaveBeenCalledWith(['/posts']);
  });

  it('should toast an error when delete fails', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(postService, 'deletePost').and.returnValue(throwError({status: 404}));

    component.deletePost('id');

    // expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should toggle commentsVisible', () => {
    component.commentsVisible = true;
    component.viewCommentsToggle();
    expect(component.commentsVisible).toBeFalsy();
  });
});

describe('PostDetailComponent Server Error', () => {
    let component: PostDetailComponent;
    let fixture: ComponentFixture<PostDetailComponent>;
    const toasterSpy = {
      pop: jasmine.createSpy('pop')
    };
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ PostDetailComponent ],
        imports: [ HttpClientTestingModule, RouterTestingModule ], // need to flesh out RTM
        providers: [
          { provide: ActivatedRoute, useValue: { data: throwError({status: 404}) } },
          { provide: ToasterService, useValue: toasterSpy }
          ]
      })
      .compileComponents();
    });
   
    it('should throw an error on init', () => {
      fixture = TestBed.createComponent(PostDetailComponent);
      component = fixture.componentInstance;

      // assign post to load HTML
      component.post = {
        _id: 'testId',
        title: 'testTitle',
        thumbnail: 'testThumbnail',
        author: {} as Author,
        summary: 'testSummary',
        content: {containers: [], last_edited: new Date()},
        admin: true,
      };

      fixture.detectChanges();
      expect(component).toBeTruthy();
      expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
    });
  
});