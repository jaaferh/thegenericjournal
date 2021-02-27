import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorListResolver } from './resolvers/author-list.resolver';
import { AlertifyService } from './services/alertify.service';
import { AuthorDetailResolver } from './resolvers/author-detail.resolver';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthorListComponent,
    AuthorDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    AlertifyService,
    AuthorListResolver,
    AuthorDetailResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
