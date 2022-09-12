import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthorDetails } from 'src/app/models/author.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AuthorService } from 'src/app/services/author.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  authorDetails!: AuthorDetails;
  topics: Topic[] = [];
  age = 0;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.authorDetails = data.authorDetail as AuthorDetails;
      this.calculateAge();
    }, error => {
      this.toaster.pop('error', error);
    });
  }

  deleteAuthor(id: string): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(id).subscribe(() => {
        this.toaster.pop('success', 'Author Deleted Successfully');
        void this.router.navigate(['/authors']);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  private calculateAge(): void {
    if (this.authorDetails.author.date_of_birth) {
      const today = new Date();
      const authorDOB = new Date(this.authorDetails.author.date_of_birth);
      const dateDiff = Math.round(today.getTime() - authorDOB.getTime());
      const day = 1000 * 60 * 60 * 24;
      const months = Math.round(dateDiff/day/31);
      this.age = Math.round(months/12);
    }
  }
}
