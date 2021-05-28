import { Component, Input, OnInit, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentTree, Comment } from 'src/app/models/comment.entity';
import { Post } from 'src/app/models/post.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  @Input() post = {} as Post;
  @Input() comments: Comment[] = [];
  commentTree: CommentTree[] = [];
  commentNumber = 0;
  newComment = {} as Comment;
  @ViewChild('newComForm') newComForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.newComForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private commentService: CommentService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.initCommentTree();
    this.commentNumber = this.comments.length;
  }

  createComment(comment: Comment): void {
    comment.post = this.post;
    comment.date_posted = new Date();
    this.commentService.createComment(comment)
    .subscribe(com => {
      this.alertify.success('Comment Created Successfully');
      this.newComForm.reset();

      // First push to Comments list
      com.parent_comment = comment.parent_comment; // Could be fixed by populating parent_comment on API POST return.
      this.comments.push(com);

      // Then push/repopulate Comment Tree
      const comTree: CommentTree = {
        thisComment: com,
        children: [],
        replyHidden: true,
        editHidden: true,
      }

      if (comment.parent_comment === undefined) {
        this.commentTree.push(comTree);
      }
      else {
        this.initCommentTree();
      }
      this.commentNumber++;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.alertify.success('Comment Deleted Successfully');
      // Remove from Tree
      this.spliceNode(commentId, this.commentTree);
      // Remove from Comment list
      const commentIndex = this.comments.findIndex(com => com._id === commentId);
      this.comments.splice(commentIndex, 1);
      this.commentNumber--;
    }, error => {
      this.alertify.error(error);
    });
  }

  private initCommentTree(): void {
    this.commentTree.length = 0;
    this.comments.sort((a, b) => a.date_posted.valueOf() - b.date_posted.valueOf());

    // Fill commentTree with comments with no parents (highest tree level)
    const noParents = this.comments.filter(c => c.parent_comment === null);
    noParents.forEach(c => {
      const comTree: CommentTree = {
        thisComment: c,
        children: [],
        replyHidden: true,
        editHidden: true,
      }
      this.commentTree.push(comTree);
    });

    // Get the comment hierarchy tree
    this.commentTree = this.popCommentChildren(this.commentTree);
  }

  // Find parent of each child and push to each parent's children list recursively
  /*
    Iterate over all comments. If a comment A's parent matches an existing,
    commentTree X, add comment A to commentTree X's children.
    Then recurse over the commentTree X's children, this time looking for
    comments that are children of commentTree X's children and so on.
  */
  private popCommentChildren(commentTree: CommentTree[]): CommentTree[] {
    this.comments.forEach(child => {
      if (child.parent_comment != null) {
        commentTree.forEach(ct => {
          const childExists = ct.children.find(ctch => ctch.thisComment._id === child._id);
          if (ct.thisComment._id === child.parent_comment?._id && !childExists) {
            const comTree: CommentTree = {
              thisComment: child,
              children: [],
              replyHidden: true,
              editHidden: true,
            }
            ct.children.push(comTree);
            ct.children = this.popCommentChildren(ct.children);
          }
        });
      }
    });
    return commentTree;
  }



  private spliceNode(commentId: string, commentTree: CommentTree[]): void {
    // Check top level parents
    const commentIndex = commentTree.findIndex(com => com.thisComment._id === commentId);
    if (commentIndex !== -1){
      commentTree.splice(commentIndex, 1);
    }
    commentTree.forEach(parentNode => {
      // Check children
      if (parentNode.children != null) {
        parentNode.children.forEach((child, index) => {
          if (child.thisComment._id === commentId) {
            parentNode.children.splice(index, 1);
            return;
          }
          else {
            this.spliceNode(commentId, parentNode.children);
          }
        });
      }
      else {
        return;
      }
    });
    return;
  }

}
