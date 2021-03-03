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
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorFormComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    AlertifyService,
    AuthorListResolver,
    AuthorDetailResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
