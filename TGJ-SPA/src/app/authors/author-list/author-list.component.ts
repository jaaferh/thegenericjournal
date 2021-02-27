import { Component, OnInit } from '@angular/core';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { AuthorService } from 'src/app/services/author.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.authors = data.authors;
      this.getAuthorDetails();
    });
  }

  getAuthorDetails(): void {
    this.authors.forEach(author => {
      this.authorService.getAuthorDetail(author._id).subscribe(data => {
        data.author.name = data.author.first_name + ' ' + data.author.family_name;
        this.authorDetails.push(data);
      });
    });
  }

}
