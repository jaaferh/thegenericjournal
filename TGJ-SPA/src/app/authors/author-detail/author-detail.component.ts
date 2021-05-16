import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorDetails } from 'src/app/models/author.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthorService } from 'src/app/services/author.service';

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
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.authorDetails = data.authorDetail;
      this.calculateAge();
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteAuthor(id: string): void {
    this.authorService.deleteAuthor(id).subscribe(() => {
      this.alertify.success('Author Deleted Successfully');
      this.router.navigate(['/authors']);
    }, error => {
      this.alertify.error(error);
    });
  }

  private calculateAge(): void {
    if (this.authorDetails.author.date_of_birth) {
      const today = new Date();
      const authorDOB = new Date(this.authorDetails.author.date_of_birth);
      const dateDiff = Math.floor(today.getTime() - authorDOB.getTime());
      const day = 1000 * 60 * 60 * 24;
      const months = Math.floor(dateDiff/day/31);
      this.age = Math.floor(months/12);
    }
  }
}
