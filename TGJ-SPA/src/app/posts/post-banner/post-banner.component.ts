import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.entity';

@Component({
  selector: 'app-post-banner',
  templateUrl: './post-banner.component.html',
  styleUrls: ['./post-banner.component.scss']
})
export class PostBannerComponent {
  @Input() posts = [] as Post[];
  p = 1;

  constructor() { }

}
