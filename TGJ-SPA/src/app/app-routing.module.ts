import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailResolver } from './resolvers/author-detail.resolver';
import { AuthorListResolver } from './resolvers/author-list.resolver';
import { TopicListResolver } from './resolvers/topic-list.resolver';
import { TopicListComponent } from './topics/topic-list/topic-list.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [], // AuthGuard
    children: [
      { path: 'authors', component: AuthorListComponent,
          resolve: {authors: AuthorListResolver} },
      { path: 'author/new', component: AuthorFormComponent },
      { path: 'author/:id', component: AuthorDetailComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'author/:id/edit', component: AuthorFormComponent,
          resolve: {authorDetail: AuthorDetailResolver} },
      { path: 'topics', component: TopicListComponent,
          resolve: {topics: TopicListResolver} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
