import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { Container } from 'src/app/models/container.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post = {} as Post;
  topics: Topic[] = [];
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
        this.topics = data.topics;
        console.log(this.post);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  doTopicFilter(): void { // Doesn't work
    this.topics.filter(topic =>
      // used 'includes' here for demo, you'd want to probably use 'indexOf'
      topic.name.toLowerCase().includes(this.topicAdd.name));
  }

  drop(event: any): void {
    moveItemInArray(this.post.content.containers, event.previousIndex, event.currentIndex);
    console.log(this.post.content.containers);
  }

  onSubmit(): void {
    if (this.mode === Mode.Create) {

    }
    else {
      if (this.id != null) {
        this.post.content.last_edited = new Date();
        this.postService.updatePost(this.id, this.post).subscribe(() => {
          this.alertify.success('Post Updated Successfully');
          this.postForm.reset(this.post);
          this.router.navigate(['/post/' + this.id]);
        }, error => {
          this.alertify.error(error);
        });
      }
    }
  }

  resetForm(): void {
    this.postForm.reset(this.post);
  }

  selectTopic(topic: Topic): void {
    this.topicAdd = topic;
  }

  addTopic(): void {
    this.post.topics?.push(this.topicAdd);
  }

  removeTopic(index: number): void {
    this.post.topics?.splice(index, 1);
  }

  addContainer(type: string): void {
    const newCont =  {} as Container;
    newCont.type = type === 'Text' ? 'Text' : 'Image';
    this.post.content.containers.push(newCont);
  }

  deleteContainer(index: number): void {
    this.post.content.containers.splice(index, 1);
  }

}

export enum Mode {
  Create = 0,
  Edit = 1
}
