import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Post } from 'src/app/models/post.entity';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: Post[] = [];
  constructor(
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.posts = this.posts = data.posts as Post[];
    }, error => {
      this.toaster.pop('error', error);
    });
  }
  
  getPostClass(index: number): string {
    const order = index % 6;

    switch (order) {
      case 1:
      case 2:
        return 'double';
      case 3:
      case 4:
      case 5:
        return 'triple';
      case 0:
        return 'single';
      default:
        return '';
    }
  }

  isSingle(index: number): boolean {
    return index % 6 === 0;
  }

}
