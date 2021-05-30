import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

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
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.initialiseUploader();
  }

  // fileOverBase(e: any): void { // boolean type
  //   this.hasBaseDropZoneOver = e;
  // }

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
        this.toaster.pop('success', 'Image Uploaded Successfully');
        this.uploadedImageUrl.emit(response);
      }
    };
  }

}
