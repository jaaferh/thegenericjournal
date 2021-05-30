import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Topic, TopicDetails } from 'src/app/models/topic.entity';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  topicDetails: TopicDetails[] = [];
  newTopic = {} as Topic;
  visibleTopics: boolean[] = [];
  showNew = false;
  p = 1;
  constructor(
    private topicService: TopicService,
    private route: ActivatedRoute,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.topics = data.topics as Topic[];
      this.getTopicDetails();
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  getTopicDetails(): void {
    this.topics.forEach(topic => {
      this.topicService.getTopicDetail(topic._id).subscribe(data => {
        this.topicDetails.push(data);
      }, error => {
        this.toaster.pop('error', error);
      });
    });
  }

  deleteTopic(topicId: string): void {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicService.deleteTopic(topicId).subscribe(() => {
        this.toaster.pop('success', 'Topic Deleted Successfully');
        const topicIndex = this.topics.findIndex(topic => topic._id === topicId);
        const topicDetIndex = this.topicDetails.findIndex(td => td.topic._id === topicId);
        this.topics.splice(topicIndex, 1);
        this.topicDetails.splice(topicDetIndex, 1);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  saveTopic(topicId: string, topic: Topic): void {
    this.topicService.updateTopic(topicId, topic).subscribe(() => {
      this.toaster.pop('success', 'Topic Updated Successfully');
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  updateClick(index: number): void {
    if (this.visibleTopics[index] === undefined)
      this.visibleTopics[index] = true;
    else 
      this.visibleTopics[index] = !this.visibleTopics[index];
  }

  createTopic(): void {
    const topicExists = this.topics.some(t => t.name.toLowerCase() === this.newTopic.name.toLowerCase());
    if (topicExists) {
      this.toaster.pop('error', 'Topic already exists');
    }
    if (Object.keys(this.newTopic).length) {
      this.topicService.createTopic(this.newTopic).subscribe(data => {
        this.toaster.pop('success', 'Topic Created Successfully');
        this.topics.push(data);
        this.topicDetails.push({topic: data, topic_posts: []});
        this.newTopic.name = '';
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }
}
