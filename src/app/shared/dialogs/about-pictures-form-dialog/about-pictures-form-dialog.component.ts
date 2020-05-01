import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PageFile} from '../../../models/page';
import {PageService} from '../../../services/page.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-about-pictures-form-dialog',
  templateUrl: './about-pictures-form-dialog.component.html',
  styleUrls: ['./about-pictures-form-dialog.component.scss']
})
export class AboutPicturesFormDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      filesIn: PageFile[]
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

  private createPictureForm(file?: PageFile) {
    if (file) {
      this.fb.group({
        'caption': [file.options.caption],
        'contain': [file.options.backgroundSize === 'contain']
      });
    } else {
      this.fb.group({
        'caption': [''],
        'contain': [false]
      });
    }
  }
}
