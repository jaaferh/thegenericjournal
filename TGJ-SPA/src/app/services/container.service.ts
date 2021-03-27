import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Container } from '../models/container.entity';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  updateContainer(containerId: string, container: Container): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'container/' + containerId + '/update', container);
  }

  createContainer(container: Container): Observable<Container> {
    return this.http.post<Container>(this.baseUrl + 'container/create', container);
  }

  deleteContainer(containerId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + 'container/' + containerId + '/delete');
  }

}
