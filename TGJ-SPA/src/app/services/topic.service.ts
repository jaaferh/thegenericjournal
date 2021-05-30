import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topic, TopicDetails, TopicsPosts } from '../models/topic.entity';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getTopicList(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.baseUrl + 'topics');
  }

  getTopicPosts(): Observable<TopicsPosts> {
    return this.http.get<TopicsPosts>(this.baseUrl + 'topics/posts');
  }

  getTopicDetail(topicId: string): Observable<TopicDetails> {
    return this.http.get<TopicDetails>(this.baseUrl + 'topic/' + topicId);
  }

  deleteTopic(topicId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'topic/' + topicId + '/delete');
  }

  updateTopic(topicId: string, topic: Topic): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'topic/' + topicId + '/update', topic);
  }

  createTopic(topic: Topic): Observable<Topic> {
    return this.http.post<Topic>(this.baseUrl + 'topic/create', topic);
  }

}
