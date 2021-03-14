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
  comments = {} as Comment[];
  commentTree: CommentTree[] = [];
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
        this.initCommentTree();
      }
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

  private initCommentTree(): void {
    this.comments.sort((a, b) => a.date_posted.valueOf() - b.date_posted.valueOf());

    // Fill commentTree with comments with no parents (highest tree level)
    const noParents = this.comments.filter(c => c.parent_comment === null);
    noParents.forEach(c => {
      this.commentTree.push({thisComment: c, children: []});
    });

    // Get the comment hierarchy tree
    this.commentTree = this.popCommentChildren(this.commentTree);
  }

  private popCommentChildren(commentTree: CommentTree[]): CommentTree[] {
    // Find parent of each child and push to each parent's children list recursively
    /*
      Iterate over all comments. If a comment A's parent matches an existing,
      commentTree X, add comment A to commentTree X's children.
      Then recurse over the commentTree X's children, this time looking for
      comments that are children of commentTree X's children and so on.
    */
    this.comments.forEach(child => {
      if (child.parent_comment != null) {
        commentTree.forEach(ct => {
          const childExists = ct.children.find(ctch => ctch.thisComment._id === child._id);
          if (ct.thisComment._id === child.parent_comment?._id && !childExists) {
            ct.children.push({thisComment: child, children: []});
            ct.children = this.popCommentChildren(ct.children);
          }
        });
      }
    });
    return commentTree;
  }


}
