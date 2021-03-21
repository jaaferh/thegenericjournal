import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post = {} as Post;
  topicAdd = {} as Topic;
  mode: Mode = Mode.Create;
  id: string | null = '';
  @ViewChild('postForm') postForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.postForm.dirty) {
      $event.returnValue = true;
    }
  }
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

  onSubmit(): void {}

  resetForm(): void {
    this.postForm.reset(this.post);
  }

  addTopic(): void {}

  removeTopic(topicId: string): void {}

  addContainer(type: string): void {}

}

export enum Mode {
  Create = 0,
  Edit = 1
}
