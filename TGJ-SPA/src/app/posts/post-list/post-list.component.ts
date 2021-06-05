import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Post, PostFilter } from 'src/app/models/post.entity';
import { Topic } from 'src/app/models/topic.entity';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  allPosts: Post[] = [];
  allTopics: Topic[] = []
  posts: Post[] = [];
  queryTopic: Topic | undefined;
  searchParam = '';
  searchEmpty = false;
  showFilter = true;
  p = 1;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const queryTopicName = this.route.snapshot.queryParams.topicName as string;

    this.route.data.subscribe(data => {
      this.allPosts = this.posts = data.posts as Post[];
      this.allTopics = data.topics as Topic[];
    }, error => {
      this.toaster.pop('error', error);
    });

    if (queryTopicName)
      this.queryTopic = this.allTopics.find(t => t.name === queryTopicName);
  }

  keyUpFunction(e: Event): void {
    if (this.searchParam.length > 0) {
      this.postService.postSearch(this.searchParam).subscribe(data => {
        this.posts = data;
        this.searchEmpty = false;
      });
    }
    else {
      if (!this.searchEmpty) {
        this.posts = this.allPosts;
        this.searchEmpty = true;
      }
    }
  }

  filterPosts(filter: PostFilter): void {
    this.postService.postFilter(filter).subscribe(fp => {
      console.log(fp);
    })
  }
}
