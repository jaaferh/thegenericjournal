/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthorListComponent } from './author-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthorsPosts } from 'src/app/models/author.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('AuthorListComponent', () => {
  let component: AuthorListComponent;
  let fixture: ComponentFixture<AuthorListComponent>;

  const authorsPosts: AuthorsPosts = {
    authors: [],
    posts: []
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ AuthorListComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, NgxPaginationModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({authorsPosts}) } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
