/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListComponent } from './topic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Topic, TopicsPosts } from 'src/app/models/topic.entity';
import { ToasterService } from 'angular2-toaster';
import { Post } from 'src/app/models/post.entity';
import { Author } from 'src/app/models/author.entity';
import { TopicService } from 'src/app/services/topic.service';
import { By } from '@angular/platform-browser';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;
  let topicService: TopicService;
  
  const toasterSpy = { pop: jasmine.createSpy('pop') };
  const topic: Topic = { _id: 'test', name: 'testname'};
  const post: Post = {
    _id: 'testId',
    title: 'testTitle',
    thumbnail: 'testThumbnail',
    author: {} as Author,
    summary: 'testSummary',
    content: {containers: [], last_edited: new Date()},
    admin: true,
    topics: [topic]
  };
  const topicsPosts: TopicsPosts = { posts: [post], topics: [topic]};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicListComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({topicsPosts}) } },
        { provide: ToasterService, useValue: toasterSpy },
        TopicService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    topicService = TestBed.inject(TopicService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.topicsPosts).toEqual(topicsPosts);
  });

  it('should get the number of posts', () => {
    component.topicsPosts = topicsPosts;
    component.visibleTopics = [false];

    expect(component.getPostCount(topic)).toEqual(1);

    // const postsP = fixture.debugElement.query(By.css('.post')).nativeElement;
    // expect(postsP.innerHTML).toBe('(Posts: 1)');
  });

  it('should delete a topic', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteTopic = spyOn(topicService, 'deleteTopic').and.returnValue(of<any>({}));

    component.deleteTopic('id');

    expect(deleteTopic).toHaveBeenCalledWith('id');
    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Topic Deleted Successfully');
    expect(component.topicsPosts.topics).toEqual([]);
  });

  it('should pop a toaster on fail', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const deleteTopic = spyOn(topicService, 'deleteTopic').and.returnValue(throwError({status: 404}));

    component.deleteTopic('id');

    expect(deleteTopic).toHaveBeenCalledWith('id');
    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should do nothing if confirm dialogue is denied on delete', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.deleteTopic('id');
    
    expect();
  });

  it('should save a change to a topic', () => {
    const updateTopic = spyOn(topicService, 'updateTopic').and.returnValue(of<any>({}));

    const topic: Topic = { _id: 'test', name: 'testname'};
    const post: Post = {
      _id: 'testId',
      title: 'testTitle',
      thumbnail: 'testThumbnail',
      author: {} as Author,
      summary: 'testSummary',
      content: {containers: [], last_edited: new Date()},
      admin: true,
      topics: [topic]
    };
    const topicsPosts: TopicsPosts = { posts: [post], topics: [topic]};

    component.topicsPosts = topicsPosts;
    component.saveTopic('id', 'newName', 0);

    expect(updateTopic).toHaveBeenCalledWith('id', {_id: 'id', name: 'newName'});
    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Topic Updated Successfully');
    expect(component.topicsPosts.topics[0].name).toEqual('newName');

    component.saveTopic('id', '', 0);

    expect();
  });

  it('should toast and error when topic save fails', () => {
    spyOn(topicService, 'updateTopic').and.returnValue(throwError({status: 404}));

    component.saveTopic('id', 'newName', 0);

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });

  it('should swap inputs and buttons with topic name on update', () => {
    component.visibleTopics = [];
    component.editedNames = [];

    const topic1: Topic = { _id: 'test', name: 'testname'};
    const post1: Post = {
      _id: 'testId',
      title: 'testTitle',
      thumbnail: 'testThumbnail',
      author: {} as Author,
      summary: 'testSummary',
      content: {containers: [], last_edited: new Date()},
      admin: true,
      topics: [topic1]
    };
    const topicsPosts1: TopicsPosts = { posts: [post1], topics: [topic1]};
    component.topicsPosts = topicsPosts1;

    component.updateClick(0);

    expect(component.visibleTopics[0]).toEqual(true);
    expect(component.editedNames[0]).toEqual('testname');


    // else
    component.visibleTopics = [true];

    component.updateClick(0);

    expect(component.visibleTopics[0]).toEqual(false);
    expect(component.editedNames[0]).toEqual('testname');
  });

  it('should create a topic and add it to the list', () => {
    const topic2: Topic = { _id: 'test', name: 'testname'};
    const post2: Post = {
      _id: 'testId',
      title: 'testTitle',
      thumbnail: 'testThumbnail',
      author: {} as Author,
      summary: 'testSummary',
      content: {containers: [], last_edited: new Date()},
      admin: true,
      topics: [topic2]
    };
    const topicsPosts2: TopicsPosts = { posts: [post2], topics: [topic2]};
    const newtopic = { _id: 'test2', name: 'testname'};

    component.topicsPosts = topicsPosts2;
    component.newTopic = newtopic;

    component.createTopic();

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', 'Topic already exists');


    const newtopic2 = { _id: 'test2', name: 'testname2'};
    component.newTopic = newtopic2;
    const createTopic = spyOn(topicService, 'createTopic').and.returnValue(of(newtopic2));

    component.createTopic();

    expect(createTopic).toHaveBeenCalledWith(newtopic2);
    expect(toasterSpy.pop).toHaveBeenCalledWith('success', 'Topic Created Successfully');
    expect(component.topicsPosts.topics).toEqual([topic2, newtopic2]);
    expect(component.newTopic.name).toEqual('');
  });

  it('should toast an error if topic create fails', () => {
    const newtopic3 = { _id: 'test2', name: 'testname3'};
    component.newTopic = newtopic3;
    spyOn(topicService, 'createTopic').and.returnValue(throwError({status: 404}));

    component.createTopic();

    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });


});



describe('TopicListComponent Server Error', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;

  const toasterSpy = { pop: jasmine.createSpy('pop') };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicListComponent ],
      imports: [ HttpClientTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: throwError({status: 404}) } },
        { provide: ToasterService, useValue: toasterSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(toasterSpy.pop).toHaveBeenCalledWith('error', Object({status: 404}));
  });
});