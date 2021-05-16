import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.entity';

@Component({
  selector: 'app-author-detail-posts',
  templateUrl: './author-detail-posts.component.html',
  styleUrls: ['./author-detail-posts.component.scss']
})
export class AuthorDetailPostsComponent {
  @Input() authorPosts = [] as Post[];

  constructor() { }

}
