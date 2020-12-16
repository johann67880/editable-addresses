import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UnsubscribeComponent } from '../../helpers/unsubscribe.component';

@Component({
  selector: 'app-editable-cell',
  templateUrl: './editable-cell.component.html',
  styleUrls: ['./editable-cell.component.css']
})
export class EditableCellComponent extends UnsubscribeComponent implements OnInit, OnChanges {
  @ViewChild('test') test: ElementRef;

  @Input() element: any;
  @Input() property: string;
  @Input() placeholder: string;
  @Input() isEditing: boolean = false;

  @Output() cellLostFocus: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.isEditing && changes.isEditing.currentValue) {

      setTimeout(()=> {
        this.test.nativeElement.focus();
      }); 

    }
  }

  onBlur(event: any): void {
    this.cellLostFocus.emit();
  }

}
