import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Comment, CommentTree } from 'src/app/models/comment.entity';
import { Post } from 'src/app/models/post.entity';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

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
    private toaster: ToasterService,
    private router: Router,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data.post as Post;
      if (this.post.comments) {
        this.comments = this.post.comments;
      }
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  updatePost(postId: string): void {
    void this.router.navigate(['/post/:id/edit', {id: postId}]);
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(() => {
        this.toaster.pop('success', 'Post Deleted Successfully');
        void this.router.navigate(['/posts']);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  viewCommentsToggle(): void {
    this.commentsVisible = !this.commentsVisible;
  }

}
