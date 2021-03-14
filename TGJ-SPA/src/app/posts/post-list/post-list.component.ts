import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  allPosts: Post[] = [];
  posts: Post[] = [];
  searchParam = '';
  searchEmpty = false;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.allPosts = this.posts = data.posts;
    }, error => {
      this.alertify.error(error);
    });
  }

  keyUpFunction(e: Event): void {
    console.log(this.searchParam);
    if (this.searchParam.length > 0) {
      this.postService.postSearch(this.searchParam).subscribe(data => {
        this.posts = data;
        this.searchEmpty = false;
      });
    }
    else {
      if (!this.searchEmpty) {
        this.posts = this.allPosts;
        this.searchEmpty = true;
      }
    }
  }

  updatePost(postId: string): void {
    this.router.navigate(['/post/:id/edit', {id: postId}]);
  }

  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.alertify.success('Post Deleted Successfully');
      const postIndex = this.posts.findIndex(post => post._id === postId);
      this.posts.splice(postIndex, 1);
    }, error => {
      this.alertify.error(error);
    });
  }

  createPost(): void {
    this.router.navigate(['post/new']);
  }
}