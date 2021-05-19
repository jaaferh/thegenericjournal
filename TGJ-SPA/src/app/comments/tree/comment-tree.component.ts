import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment, CommentTree } from 'src/app/models/comment.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent {
  @Input() comments: CommentTree[] = [];
  @Output() delCommentId = new EventEmitter<string>();
  @Output() replyCommentOut = new EventEmitter<Comment>();
  newReply = {} as Comment;
  replyBoxesHidden = true;
  editComment = {} as Comment;
  editHidden = true;

  @ViewChild('newRepForm') newRepForm!: NgForm;

  constructor(
    private commentService: CommentService,
    private alertify: AlertifyService
  ) { }

  like(comment: Comment): void {
    this.commentService.like(comment._id).subscribe(() => {
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === comment._id);
      this.comments[commentIndex].thisComment.likes++;
    }, error => {
      this.alertify.error(error);
    });
  }

  dislike(comment: Comment): void {
    this.commentService.dislike(comment._id).subscribe(() => {
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === comment._id);
      this.comments[commentIndex].thisComment.dislikes++;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteComment(commentId: string): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.delCommentId.emit(commentId);
    }
  }

  replyClick(comment: Comment): void {
    this.replyBoxesHidden = !this.replyBoxesHidden;
    this.newReply.parent_comment = comment;
  }

  createReply(newComment: Comment): void {
    this.replyCommentOut.emit(newComment);
    if (this.newRepForm !== undefined) {
      this.newRepForm.reset();
      this.replyBoxesHidden = true;
    }
  }

  editClick(comment: Comment): void {
    this.editHidden = !this.editHidden;
    this.editComment = comment;
  }

  submitEdit(editedComment: Comment): void {
    editedComment.last_edited = new Date();
    this.commentService.updateComment(editedComment._id, editedComment).subscribe(() => {
      this.alertify.success('Comment Edited Successfully');
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === editedComment._id);
      this.comments[commentIndex].thisComment.text = editedComment.text;
      this.editHidden = true;
    }, error => {
      this.alertify.error(error);
    });
  }

  // onexpand(comment: Comment): void {
  //   if (comment.expanded) {
  //     comment.expanded = !comment.expanded;
  //     return;
  //   } else {
  //     if (comment.children) {
  //       if (comment.children.length > 0) {
  //         comment.expanded = true;
  //       } else {
  //         comment.expanded = false;
  //       }
  //     }
  //   }
  // }

}
