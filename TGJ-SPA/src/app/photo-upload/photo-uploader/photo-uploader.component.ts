import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-photo-uploader',
  templateUrl: './photo-uploader.component.html',
  styleUrls: ['./photo-uploader.component.scss']
})
export class PhotoUploaderComponent implements OnInit {
  uploader = {} as FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  @Output() uploadedImageUrl = new EventEmitter<string>();

  constructor(
    private alertify: AlertifyService,
  ) { }

  ngOnInit(): void {
    this.initialiseUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initialiseUploader(): void {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'cloudinary/upload',
      // url: this.baseUrl + 'upload',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        console.log(response);
        this.alertify.success('Image Uploaded Successfully');
        this.uploadedImageUrl.emit(response);
      }
    };
  }

}
