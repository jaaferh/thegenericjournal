import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post = {} as Post;
  commentsVisible = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post;
      console.log(this.post);
    }, error => {
      this.alertify.error(error);
    });
  }

  viewCommentsToggle(): void {
    this.commentsVisible = !this.commentsVisible;
  }

  replyClick(commentId: string): void {

  }


}
