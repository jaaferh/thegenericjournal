import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Post, PostFilter } from 'src/app/models/post.entity';
import { Topic } from 'src/app/models/topic.entity';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  allPosts: Post[] = [];
  allTopics: Topic[] = [];
  posts: Post[] = [];
  queryTopic: Topic | undefined;
  searchParam = '';
  searchEmpty = false;
  showFilter = true;
  filter = {} as PostFilter;
  p = 1;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private router: Router,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    const queryTopicName = this.route.snapshot.queryParams.topicName as string;
    const navSearch = this.route.snapshot.queryParams.searchParam as string;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
    this.route.data.subscribe(data => {
      this.allPosts = this.posts = data.posts as Post[];
      this.allTopics = data.topics as Topic[];
    }, error => {
      this.toaster.pop('error', error);
    });

    if (navSearch) {
      this.searchParam = navSearch;
      this.keyUpFunction();
    }

    if (queryTopicName) {
      this.queryTopic = this.allTopics.find(t => t.name === queryTopicName);
      // Can't do this in post-filter due to NG0100 error
      this.filter.topics = [];
      this.filter.topics?.push(this.queryTopic as Topic);
      this.filterPosts(this.filter);
    }
  }

  keyUpFunction(): void {
    if (this.searchParam.length > 0) {
      this.postService.postSearch(this.searchParam).subscribe(data => {
        // Inner join the two arrays
        this.posts = this.posts.filter(p => data.some(d => d._id === p._id));
        this.searchEmpty = false;
      });
    }
    else {
      if (!this.searchEmpty) {
        this.searchEmpty = true;

        if (this.filter === undefined)
          this.posts = this.allPosts;
        else
          this.filterPosts(this.filter);
      }
    }
  }

  filterPosts(filter: PostFilter): void {
    this.filter = filter;
    this.posts = this.allPosts.filter(p => {
      if (filter.authorName) {
        p.author.name = p.author.first_name + ' ' + p.author.family_name;
        const regName = filter.authorName.toLowerCase();
        if (p.author.name.toLowerCase().indexOf(regName) === -1) 
          return false;
      }

      if (filter.topics !== undefined) {
        for (const topic of filter.topics) {
          if (!p.topics?.some(t => t._id === topic._id))
            return false;
        }
      }

      if (filter.dateFrom) {
        if ((new Date(p.date_created as Date)) < filter.dateFrom)
          return false;
      }

      if (filter.dateTo) {
        if ((new Date(p.date_created as Date)) > filter.dateTo)
          return false;
      }

      return true;
    });

    if (this.searchParam.length > 0)
      this.keyUpFunction();
  }
}
