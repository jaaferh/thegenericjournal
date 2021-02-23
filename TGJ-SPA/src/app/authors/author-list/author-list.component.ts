import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.entity';
import { AuthorService } from 'src/app/services/author.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthorList().subscribe(data => {
      data.forEach(d => d.name = d.first_name + ' ' + d.family_name);
      this.authors = data;
      console.log(data);
    });
  }

}
