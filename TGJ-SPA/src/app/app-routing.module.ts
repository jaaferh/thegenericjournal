import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './home/homepage/homepage.component';
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
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: HomepageComponent,
      resolve: {posts: PostListResolver} },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [], // AuthGuard
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'authors', component: AuthorListComponent,
          resolve: {authorsPosts: AuthorPostsResolver} },
      { path: 'author/new', component: AuthorFormComponent },
      { path: 'author/:id', component: AuthorDetailComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'author/:id/edit', component: AuthorFormComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'topics', canActivate: [ AuthGuard ], 
          component: TopicListComponent,
          resolve: {topicsPosts: TopicPostsResolver} },
      { path: 'posts', component: PostListComponent,
          resolve: {posts: PostListResolver, topics: TopicListResolver} },
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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
