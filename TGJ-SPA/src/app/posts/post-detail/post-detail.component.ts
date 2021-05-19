import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post;
      if (this.post.comments) {
        this.comments = this.post.comments;
      }
    }, error => {
      this.alertify.error(error);
    });
  }

  updatePost(postId: string): void {
    this.router.navigate(['/post/:id/edit', {id: postId}]);
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.alertify.success('Post Deleted Successfully');
        this.router.navigate(['/posts']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  viewCommentsToggle(): void {
    this.commentsVisible = !this.commentsVisible;
  }

}
