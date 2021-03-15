import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, CommentTree } from 'src/app/models/comment.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input() comments: CommentTree[] = [];
  @Output() delCommentId = new EventEmitter<string>();
  newComment = {} as Comment;

  constructor(
    private commentService: CommentService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
  }

  deleteComment(commentId: string): void {
    this.delCommentId.emit(commentId);
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

  replyClick(commentId: string): void {}

}
