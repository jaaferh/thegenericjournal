import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostFilter } from 'src/app/models/post.entity';
import { Topic } from 'src/app/models/topic.entity';

@Component({
  selector: 'app-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss']
})
export class PostFilterComponent implements OnInit {
  @Input() topics = [] as Topic[];
  @Input() paramTopic: Topic | undefined;
  @Output() postFilter = new EventEmitter<PostFilter>();
  filter = {} as PostFilter;
  topicAdd = {} as Topic;
  constructor() { }

  ngOnInit(): void {
    if (this.paramTopic) {
      this.filter.topics = [];
      this.filter.topics?.push(this.paramTopic);
    }
  }

  onSubmit(): void {
    if (Object.keys(this.filter).length > 0) {
      this.postFilter.emit(this.filter);
    }
  }

  dateChange(dateString: string, type: string): void {
    if (!dateString)
      return

    if (type === 'from') {
      this.filter.dateFrom = new Date(dateString);
    } else if (type === 'to') {
      this.filter.dateTo = new Date(dateString);
    }
  }

  addTopic(): void {
    const topicChosen = Object.keys(this.topicAdd).length > 0;
    const topicDupe = this.filter.topics?.find(t => t._id === this.topicAdd._id);
    if (topicChosen && !topicDupe) { // Object not empty
      if (!this.filter.topics) {
        this.filter.topics = [];
      }
      this.filter.topics?.push(this.topicAdd);
    }
  }

  removeTopic(index: number): void {
    this.filter.topics?.splice(index, 1);
  }

}
