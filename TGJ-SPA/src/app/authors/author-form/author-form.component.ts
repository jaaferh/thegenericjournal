import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  mode: Mode = Mode.Create;
  id: string | null = '';
  author = {} as Author;
  @ViewChild('authorForm') authorForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.authorForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private authorService: AuthorService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? Mode.Edit : Mode.Create;
    console.log(this.id);

    if (this.mode === Mode.Edit) {
      this.route.data.subscribe(data => {
        this.author = data.authorDetail.author;
        console.log(this.author);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  getUploadedUrl(imageUrl: string): void {
    this.author.pic_url = imageUrl;
  }

  onSubmit(): void {
    console.log(this.author);
    if (this.mode === Mode.Create) {
      this.authorService.createAuthor(this.author).subscribe(newA => {
        this.alertify.success('Author Created Successfully');
        this.authorForm.reset(this.author);
        this.router.navigate(['/author/' + newA._id]);
      }, error => {
        this.alertify.error(error);
      });
    }
    else {
      if (this.id != null) {
        this.authorService.updateAuthor(this.id, this.author).subscribe(() => {
          this.alertify.success('Author Updated Successfully');
          this.authorForm.reset(this.author);
          this.router.navigate(['/author/' + this.id]);
        }, error => {
          this.alertify.error(error);
        });
      }
    }
  }

  resetForm(): void {
    this.authorForm.reset(this.author);
  }
}

export enum Mode {
  Create = 0,
  Edit = 1
}
