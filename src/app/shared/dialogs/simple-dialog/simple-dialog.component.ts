import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      subtitle?: string,
      message: string,
      closeLabel?: string,
      type?: 'error' | 'info'
    }
  ) {
    if (data.closeLabel == null) {
      data.closeLabel = 'Fermer';
    }
    if (this.data.type == null) {
      this.data.type = 'info';
    }
  }

  ngOnInit() {
  }

}
