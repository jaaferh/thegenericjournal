import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post = {} as Post;
  mode: Mode = Mode.Create;
  id: string | null = '';
  constructor(
    private postService: PostService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? Mode.Edit : Mode.Create;
    console.log(this.id);

    if (this.mode === Mode.Edit) {
      this.route.data.subscribe(data => {
        this.post = data.post;
        console.log(this.post);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

}

export enum Mode {
  Create = 0,
  Edit = 1
}
