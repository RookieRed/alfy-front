import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      message: string,
      confirmLabel?: string,
      closeLabel?: string,
      type?: 'error' | 'info'
    }
  ) {
    if (this.data.type == null) {
      this.data.confirmLabel = 'Confirmer'
    }
    if (data.closeLabel == null) {
      data.closeLabel = 'Fermer';
    }
    if (this.data.type == null) {
      this.data.type = 'info'
    }
  }

  ngOnInit() {
  }

}
