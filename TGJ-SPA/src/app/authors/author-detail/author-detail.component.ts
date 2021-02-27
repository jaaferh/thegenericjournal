import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorDetails } from 'src/app/models/author.entity';
import { Topic } from 'src/app/models/topic.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
// import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  authorDetails!: AuthorDetails;
  topics: Topic[] = [];
  constructor(
    // private authorService: AuthorService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.authorDetails = data.authorDetail;
      console.log(this.authorDetails);
    }, error => {
      this.alertify.error(error);
    });
  }

}
