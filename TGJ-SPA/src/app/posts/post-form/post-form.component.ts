import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { Container } from 'src/app/models/container.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { PostService } from 'src/app/services/post.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ContainerService } from 'src/app/services/container.service';
import { Author, AuthorsPosts } from 'src/app/models/author.entity';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  post = {} as Post;
  topics: Topic[] = [];
  authors: Author[] = [];
  topicAdd = {} as Topic;
  showNewContainer = false;
  containerAdd = {} as Container;
  mode: Mode = Mode.Create;
  id: string = '';
  @ViewChild('postForm') postForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: Event): void {
    if (this.postForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private postService: PostService,
    private containerService: ContainerService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.mode = this.id ? Mode.Edit : Mode.Create;

    this.route.data.subscribe(data => {
      if (this.mode === Mode.Edit) {
        this.post = data.post as Post;
      }
      this.topics = data.topics as Topic[];
      const resAuthorPosts = data.authorsPosts as AuthorsPosts;
      this.authors = resAuthorPosts.authors;
    }, error => {
      this.alertify.error(error);
    });
  }

  doTopicFilter(): void { // Doesn't work
    this.topics.filter(topic =>
      // used 'includes' here for demo, you'd want to probably use 'indexOf'
      topic.name.toLowerCase().includes(this.topicAdd.name));
  }

  doAuthorFilter(): void { } // TODO

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.post.content.containers, event.previousIndex, event.currentIndex);
  }

  getUploadedThumbnail(imageUrl: string): void {
    this.post.thumbnail = imageUrl;
  }

  getUploadedImgCont(containerIndex: number, imageUrl: string): void {
    this.post.content.containers[containerIndex].image_url = imageUrl;
  }

  getUploadedImgContAdd(imageUrl: string): void {
    this.containerAdd.image_url = imageUrl;
  }

  onSubmit(): void {
    if (this.mode === Mode.Create) {
      this.postService.createPost(this.post).subscribe(newP => {
        this.alertify.success('Post Created Successfully');
        this.postForm.reset(this.post);
        void this.router.navigate(['/post/' + newP._id]);
      }, error => {
        this.alertify.error(error);
      });
    }
    else {
      // Update Post
      if (this.id != null) {
        this.post.content.last_edited = new Date();
        this.postService.updatePost(this.id, this.post).subscribe(() => {
          this.alertify.success('Post Updated Successfully');
          this.postForm.reset(this.post);
          void this.router.navigate(['/post', this.id]);
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
    const topicChosen = Object.keys(this.topicAdd).length > 0;
    const topicDupe = this.post.topics?.find(t => t._id === this.topicAdd._id);
    if (topicChosen && !topicDupe) { // Object not empty
      this.post.topics?.push(this.topicAdd);
    }
  }

  removeTopic(index: number): void {
    this.post.topics?.splice(index, 1);
  }

  selectAuthor(author: Author): void {
    this.post.author = author;
  }

  addContainer(type: string): void {
    // const newCont =  {} as Container;
    this.showNewContainer = !this.showNewContainer;
    this.containerAdd.type = type === 'Text' ? 'Text' : 'Image';
    // this.post.content.containers.push(newCont);
  }

  createContainer(): void {
    this.containerAdd.post = this.post;
    this.containerService.createContainer(this.containerAdd).subscribe(cont => {
      this.alertify.success('Container Created Successfully');
      this.post.content.containers.push(cont);
      this.showNewContainer = false;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteContainer(containerId: string, index: number): void {
    if (containerId !== undefined) {
      this.containerService.deleteContainer(containerId).subscribe(() => {
        this.post.content.containers.splice(index, 1);
      }, error => {
        this.alertify.error(error);
      });
    }
    else {
      this.post.content.containers.splice(index, 1);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}

export enum Mode {
  Create = 0,
  Edit = 1
}
