import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageService} from '../../../services/page.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiFile} from "../../../models/file";

@Component({
  selector: 'app-about-pictures-form-dialog',
  templateUrl: './about-pictures-form-dialog.component.html',
  styleUrls: ['./about-pictures-form-dialog.component.scss']
})
export class AboutPicturesFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      filesIn: ApiFile[]
    },
    private pageService: PageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      'pictures': this.fb.array([])
    });
  }

  ngOnInit() {
    this.data.filesIn.forEach(file => this.createPictureForm(file));
  }

  onUploadNewPicture() {

  }

  onDeletePicture() {

  }

  onSubmitForm() {

  }

  private createPictureForm(file?: ApiFile) {
    if (file) {
      this.fb.group({
        'caption': [file.config.caption],
        'contain': [file.config.backgroundSize === 'contain']
      });
    } else {
      this.fb.group({
        'caption': [''],
        'contain': [false]
      });
    }
  }
}
