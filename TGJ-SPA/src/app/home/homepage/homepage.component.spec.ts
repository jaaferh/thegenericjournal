/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable, of, throwError } from 'rxjs';
import { Author } from 'src/app/models/author.entity';
import { Post } from 'src/app/models/post.entity';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  const posts: Post[] = [];
  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: {} as Author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true
  };
  posts.push(post);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({posts}) } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign posts from resolver', () => {
    expect(component.posts).toBeTruthy();
  });

  it('should get class based on loop index', () => {
    expect(component.getPostClass(1)).toBe('double');
    expect(component.getPostClass(3)).toBe('triple');
    expect(component.getPostClass(0)).toBe('single');
  });

  it('should calculate if row is single', () => {
    expect(component.isSingle(6)).toBe(true);
    expect(component.isSingle(3)).toBe(false);
  });
});

describe('HomepageComponent Server Error', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  const toasterSpy = {
    pop: jasmine.createSpy('pop')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: throwError({status: 404}) } },
        { provide: ToasterService, useValue: toasterSpy }
      ]
    })
    .compileComponents();
  });

  it('should throw an error on create', () => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });
});
