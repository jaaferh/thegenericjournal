import { Component, Input, OnInit } from '@angular/core';
import { Comment, CommentTree } from 'src/app/models/comment.entity';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.scss']
})
export class CommentTreeComponent implements OnInit {
  @Input() comments: CommentTree[] = [];

  constructor() { }

  ngOnInit(): void {
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
