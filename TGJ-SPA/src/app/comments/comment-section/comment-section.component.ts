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
  @Input() comments: CommentTree[] = [];
  @Input() commentNumber = 0;
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
  }

  createComment(): void {
    this.newComment.date_posted = new Date();
    console.log(this.newComment);
    this.commentService.createComment(this.newComment, this.post._id)
    .subscribe(com => {
      this.alertify.success('Comment Created Successfully');
      this.newComForm.reset();
      this.comments.push({thisComment: com, children: []});
      this.commentNumber++;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteComment(commentId: string): void {
    console.log(commentId);
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.alertify.success('Comment Deleted Successfully');
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === commentId);
      this.comments.splice(commentIndex, 1);
      this.comments = this.spliceTree(commentId, this.comments);
      this.commentNumber--;
    }, error => {
      this.alertify.error(error);
    });
  }

  private spliceTree(delCommentId: string, commentTree: CommentTree[]): CommentTree[] {
    commentTree.forEach(ct => {
      if (ct.thisComment._id !== delCommentId) {
        ct.children = this.spliceTree(delCommentId, ct.children);
      }
      else {
        ct.children = [];
      }
    });
    return commentTree;
  }

}
