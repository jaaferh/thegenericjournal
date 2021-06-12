import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Comment, CommentTree } from 'src/app/models/comment.entity';
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
  editComment = {} as Comment;

  @ViewChild('newRepForm') newRepForm!: NgForm;
  @ViewChild('editCommentForm') editCommentForm!: NgForm;

  constructor(
    private commentService: CommentService,
    private toaster: ToasterService
  ) { }

  like(comment: Comment): void {
    this.commentService.like(comment._id).subscribe(() => {
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === comment._id);
      this.comments[commentIndex].thisComment.likes++;
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  dislike(comment: Comment): void {
    this.commentService.dislike(comment._id).subscribe(() => {
      const commentIndex = this.comments.findIndex(com => com.thisComment._id === comment._id);
      this.comments[commentIndex].thisComment.dislikes++;
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  deleteComment(commentId: string): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.delCommentId.emit(commentId);
    }
  }

  replyClick(comment: Comment, index: number): void {
    this.comments[index].replyHidden = !this.comments[index].replyHidden;
    this.comments[index].hideChildren = false;
    this.newReply.parent_comment = comment;
  }

  createReply(newComment: Comment, index: number): void {
    this.replyCommentOut.emit(newComment);
    if (this.newRepForm !== undefined) {
      this.newRepForm.reset();
      this.comments[index].replyHidden = true;
    }
  }

  editClick(index: number): void {
    this.comments[index].editHidden = !this.comments[index].editHidden;
    this.editComment = Object.assign({}, this.comments[index].thisComment);
    if (this.editCommentForm)
      this.editCommentForm.control.markAsPristine();
  }

  submitEdit(editedComment: Comment, index: number): void {
    if (editedComment.text.length > 0) {
      editedComment.last_edited = new Date();
      this.commentService.updateComment(editedComment._id, editedComment).subscribe(() => {
        this.toaster.pop('success', 'Comment Edited Successfully');
        const commentIndex = this.comments.findIndex(com => com.thisComment._id === editedComment._id);
        this.comments[commentIndex].thisComment.text = editedComment.text;
        this.comments[commentIndex].thisComment.last_edited = new Date();
        this.comments[index].editHidden = true;
      }, error => {
        this.toaster.pop('error', error);
      }); 
    } 
  }
}
