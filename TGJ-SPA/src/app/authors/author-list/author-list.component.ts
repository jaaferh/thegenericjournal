import { Component, OnInit } from '@angular/core';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { AuthorService } from 'src/app/services/author.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  allAuthors: Author[] = [];
  authorDetails: AuthorDetails[] = [];
  searchParam = '';
  searchEmpty = false;
  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.allAuthors = data.authors;
      this.initAuthors(this.allAuthors);
    }, error => {
      this.alertify.error(error);
    });
  }

  getAuthorDetails(): void {
    this.authors.forEach(author => {
      this.authorService.getAuthorDetail(author._id).subscribe(data => {
        data.author.name = data.author.first_name + ' ' + data.author.family_name;
        this.authorDetails.push(data);
      }, error => {
        this.alertify.error(error);
      });
    });
    console.log(this.authorDetails);
  }

  keyUpFunction(e: Event): void {
    console.log(this.searchParam);
    if (this.searchParam.length > 0) {
      this.authorService.authorSearch(this.searchParam).subscribe(data => {
        this.initAuthors(data);
        this.searchEmpty = false;
      });
    }
    else {
      if (!this.searchEmpty) {
        this.initAuthors(this.allAuthors);
        this.searchEmpty = true;
      }
    }
  }

  private initAuthors(author: Author[]): void {
    this.authors = author;
    this.authorDetails = [];
    this.getAuthorDetails();
  }
}
