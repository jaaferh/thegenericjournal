import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthorDetailResolver } from './resolvers/author-detail.resolver';
import { AuthorListResolver } from './resolvers/author-list.resolver';
import { AuthorPostsResolver } from './resolvers/author-posts.resolver';
import { PostDetailResolver } from './resolvers/post-detail.resolver';
import { PostListResolver } from './resolvers/post-list.resolver';
import { TopicListResolver } from './resolvers/topic-list.resolver';
import { TopicPostsResolver } from './resolvers/topic-posts.resolver';
import { TopicListComponent } from './topics/topic-list/topic-list.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [], // AuthGuard
    children: [
      { path: 'authors', component: AuthorListComponent,
          resolve: {authorsPosts: AuthorPostsResolver} },
      { path: 'author/new', component: AuthorFormComponent },
      { path: 'author/:id', component: AuthorDetailComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'author/:id/edit', component: AuthorFormComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'topics', component: TopicListComponent,
          resolve: {topicsPosts: TopicPostsResolver} },
      { path: 'posts', component: PostListComponent,
          resolve: {posts: PostListResolver} },
      { path: 'post/new', component: PostFormComponent,
          resolve: {topics: TopicListResolver, authors: AuthorListResolver} },
      { path: 'post/:id', component: PostDetailComponent,
          resolve: {post: PostDetailResolver} },
      { path: 'post/:id/edit', component: PostFormComponent,
          resolve: {post: PostDetailResolver, topics: TopicListResolver,
              authors: AuthorListResolver} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
