import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'editable-element',
  templateUrl: './editable-element.component.html',
  styleUrls: ['./editable-element.component.scss']
})
export class EditableElementComponent implements OnInit {

  @Input()
  hide: boolean;
  @Output('onEdit')
  private clickEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  edit() {
    this.clickEmitter.emit();
  }
}
