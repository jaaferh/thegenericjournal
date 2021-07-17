import { Component, OnInit } from '@angular/core';
import { Author, AuthorsPosts } from 'src/app/models/author.entity';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authorsPosts = {} as AuthorsPosts;
  allAuthorsPosts = {} as AuthorsPosts;
  searchParam = '';
  searchEmpty = false;
  p = 1;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToasterService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.allAuthorsPosts = data.authorsPosts as AuthorsPosts;
      this.authorsPosts = {...this.allAuthorsPosts};
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  getPostCount(author: Author): number {
    return this.authorsPosts.posts.filter(p => p.author._id === author._id).length;
  }

  keyUpFunction(e: Event): void {
    if (this.searchParam.length > 0) {
      this.authorService.authorSearch(this.searchParam).subscribe(data => {
        this.authorsPosts.authors = data;
        this.searchEmpty = false;
      });
    }
    else {
      if (!this.searchEmpty) {
        this.authorsPosts.authors = this.allAuthorsPosts.authors;
        this.searchEmpty = true;
      }
    }
  }

  routeToAuthor(authorId: string): void {
    void this.router.navigate(['/author', authorId]);
  }

}
