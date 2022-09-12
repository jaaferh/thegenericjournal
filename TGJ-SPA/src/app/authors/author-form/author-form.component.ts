import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, AuthorDetails } from 'src/app/models/author.entity';
import { AuthorService } from 'src/app/services/author.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  mode: Mode = Mode.Create;
  id: string = '';
  author = {} as Author;
  newDate: any;
  @ViewChild('authorForm') authorForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: Event): void {
    if (this.authorForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private authorService: AuthorService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.mode = this.id ? Mode.Edit : Mode.Create;
    this.author.pic_url = 'http://res.cloudinary.com/soqudu/image/upload/v1621168850/xyniooa0hep6j8eeboin.png';

    if (this.mode === Mode.Edit) {
      this.route.data.subscribe(data => {
        const resAuthorDetail =  data.authorDetail as AuthorDetails;
        this.author = resAuthorDetail.author;
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  dateChange(dateString: string): void {
    if (dateString) {
      this.author.date_of_birth = new Date(dateString);
    }
  }

  getUploadedUrl(imageUrl: string): void {
    this.author.pic_url = imageUrl;
  }

  onSubmit(): void {
    if (this.mode === Mode.Create) {
      this.authorService.createAuthor(this.author).subscribe(newA => {
        this.toaster.pop('success', 'Author Created Successfully');
        this.authorForm.reset(this.author);
        void this.router.navigate(['/author', newA._id]);
        
      }, error => {
        this.toaster.pop('error', error);
      });
    }
    else {
      if (this.id) {
        this.authorService.updateAuthor(this.id, this.author).subscribe(() => {
          this.toaster.pop('success', 'Author Updated Successfully');
          this.authorForm.reset(this.author);
          void this.router.navigate(['/author', this.id]);
        }, error => {
          this.toaster.pop('error', error);
        });
      }
    }
  }

  navigateAuthors(): void {
    this.location.back();
  }
}

export enum Mode {
  Create = 0,
  Edit = 1
}
