import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.entity';
import { Container } from 'src/app/models/container.entity';
import { Topic } from 'src/app/models/topic.entity';
import { PostService } from 'src/app/services/post.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ContainerService } from 'src/app/services/container.service';
import { Author, AuthorsPosts } from 'src/app/models/author.entity';
import { ToasterService } from 'angular2-toaster';
import { Location } from '@angular/common';

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
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.mode = this.id ? Mode.Edit : Mode.Create;

    this.route.data.subscribe(data => {
      if (this.mode === Mode.Edit) {
        this.post = data.post as Post;
      }
      this.topics = data.topics as Topic[];
      this.authors = data.authors as Author[];
    }, error => {
      this.toaster.pop('error', error);
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
      if (!this.post.thumbnail) {
        this.toaster.pop('error', 'Missing thumbnail');
        return;
      }

      this.postService.createPost(this.post).subscribe(newP => {
        this.toaster.pop('success', 'Post Created Successfully');
        this.postForm.reset(this.post);
        void this.router.navigate(['/post/' + newP._id]);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
    else {
      // Update Post
      if (this.id != null) {
        this.post.content.last_edited = new Date();
        this.postService.updatePost(this.id, this.post).subscribe(() => {
          this.toaster.pop('success', 'Post Updated Successfully');
          this.postForm.reset(this.post);
          void this.router.navigate(['/post', this.id]);
        }, error => {
          this.toaster.pop('error', error);
        });
      }
    }
  }

  resetForm(): void {
    this.postForm.reset(this.post);
  }

  addTopic(): void {
    const topicChosen = Object.keys(this.topicAdd).length > 0;
    const topicDupe = this.post.topics?.find(t => t._id === this.topicAdd._id);
    if (topicChosen && !topicDupe) { // Object not empty
      if (!this.post.topics) {
        this.post.topics = [];
      }
      this.post.topics?.push(this.topicAdd);
    }
  }

  removeTopic(index: number): void {
    this.post.topics?.splice(index, 1);
  }

  addContainer(type: string): void {
    this.showNewContainer = !this.showNewContainer;
    this.containerAdd.type = type === 'Text' ? 'Text' : 'Image';
  }

  createContainer(): void {
    this.containerAdd.post = this.post;
    this.containerService.createContainer(this.containerAdd).subscribe(cont => {
      this.toaster.pop('success', 'Container Created Successfully');
      this.post.content.containers.push(cont);
      this.showNewContainer = false;
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  deleteContainer(containerId: string, index: number): void {
    if (containerId !== undefined) {
      this.containerService.deleteContainer(containerId).subscribe(() => {
        this.post.content.containers.splice(index, 1);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
    else {
      this.post.content.containers.splice(index, 1);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  navigatePost(): void {
    this.location.back();
  }

}

export enum Mode {
  Create = 0,
  Edit = 1
}
