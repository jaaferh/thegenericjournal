import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDetailPostsComponent } from './author-detail-posts.component';

describe('AuthorDetailPostComponent', () => {
  let component: AuthorDetailPostsComponent;
  let fixture: ComponentFixture<AuthorDetailPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDetailPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorDetailPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
