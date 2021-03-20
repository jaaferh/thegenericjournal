import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Comment, CommentTree } from 'src/app/models/comment.entity';
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
  comments: Comment[] = [];
  commentsVisible = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post;
      if (this.post.comments) {
        this.comments = this.post.comments;
      }
      console.log(this.post);
    }, error => {
      this.alertify.error(error);
    });
  }

  viewCommentsToggle(): void {
    this.commentsVisible = !this.commentsVisible;
  }

}
