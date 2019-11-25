import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.scss']
})
export class EditableElementComponent implements OnInit {

  @Output('onEdit')
  private clickEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  private hide: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  edit() {
    this.clickEmitter.emit();
  }
}
