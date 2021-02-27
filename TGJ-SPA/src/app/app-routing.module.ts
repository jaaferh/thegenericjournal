import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorListResolver } from './resolvers/author-list.resolver';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [], // AuthGuard
    children: [
      { path: 'authors', component: AuthorListComponent,
          resolve: {authors: AuthorListResolver} },
      { path: 'author/:id', component: AuthorDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
