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
import { TopicListComponent } from './topics/topic-list/topic-list.component';
import { TopicListResolver } from './resolvers/topic-list.resolver';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostListResolver } from './resolvers/post-list.resolver';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDetailResolver } from './resolvers/post-detail.resolver';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { CommentTreeComponent } from './comments/tree/comment-tree.component';
import { CommentSectionComponent } from './comments/comment-section/comment-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { FileUploadModule } from 'ng2-file-upload';
import { PhotoUploaderComponent } from './photo-upload/photo-uploader/photo-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorFormComponent,
    TopicListComponent,
    PostListComponent,
    PostDetailComponent,
    PostFormComponent,
    CommentTreeComponent,
    CommentSectionComponent,
    PhotoUploaderComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    FontAwesomeModule,
    FileUploadModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'soqudu' }),
  ],
  providers: [
    AlertifyService,
    AuthorListResolver,
    AuthorDetailResolver,
    TopicListResolver,
    PostListResolver,
    PostDetailResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
