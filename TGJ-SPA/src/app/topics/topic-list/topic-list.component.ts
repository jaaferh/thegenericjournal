import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Topic, TopicDetails, TopicsPosts } from 'src/app/models/topic.entity';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topicsPosts = {} as TopicsPosts;
  newTopic = {} as Topic;
  visibleTopics: boolean[] = [];
  editedNames: string[] = [];
  showNew = false;
  p = 1;
  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.topicsPosts = data.topicsPosts as TopicsPosts;
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  getPostCount(topic: Topic): number {
    return this.topicsPosts.posts.filter(p => p.topics?.some(t => t._id === topic._id)).length;
  }

  deleteTopic(topicId: string): void {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicService.deleteTopic(topicId).subscribe(() => {
        this.toaster.pop('success', 'Topic Deleted Successfully');
        const topicIndex = this.topicsPosts.topics.findIndex(t => t._id === topicId);
        this.topicsPosts.topics.splice(topicIndex, 1);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  saveTopic(topicId: string, name: string, index: number): void {
    if (name.length > 1) {
      const editedTopic = { _id: topicId, name } as Topic;
      this.topicService.updateTopic(topicId, editedTopic).subscribe(() => {
        this.toaster.pop('success', 'Topic Updated Successfully');
        this.topicsPosts.topics[index].name = name;
        this.updateClick(index);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
    else 
      this.toaster.pop('info', 'Topic must have a name');
  }

  updateClick(index: number): void {
    if (this.visibleTopics[index] === undefined) {
      this.visibleTopics[index] = true;
      this.editedNames[index] = this.topicsPosts.topics[index].name;
    }
    else {
      this.visibleTopics[index] = !this.visibleTopics[index];
      this.editedNames[index] = this.topicsPosts.topics[index].name;
    }
      
  }

  createTopic(): void {
    const topicExists = this.topicsPosts.topics
      .some(t => t.name.toLowerCase() === this.newTopic.name.toLowerCase());
    if (topicExists) {
      this.toaster.pop('error', 'Topic already exists');
    }
    if (Object.keys(this.newTopic).length) {
      this.topicService.createTopic(this.newTopic).subscribe(data => {
        this.toaster.pop('success', 'Topic Created Successfully');
        this.topicsPosts.topics.push(data);
        this.newTopic.name = '';
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }
}
