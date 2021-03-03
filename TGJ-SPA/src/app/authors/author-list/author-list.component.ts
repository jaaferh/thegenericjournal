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
  authorDetails: AuthorDetails[] = [];
  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.authors = data.authors;
      this.getAuthorDetails();
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
}
