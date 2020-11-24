import { ViewAttribute } from '../../../api/models/view-attribute';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IViewEngineColumn } from './ve-grid.interface';

@Component({
  selector: 've-grid',
  templateUrl: './ve-grid.component.html',
  styleUrls: ['./ve-grid.component.scss']
})
export class ViewEngineGridComponent {
  @Input('attributes')
  attributes: ViewAttribute[];
  @Input('records')
  records: object[];
  @Input('pkField')
  pkField: string;
  @Input('selectedRecord')
  selectedRecord: object;

  @Output()
  onSelectRecord: EventEmitter<object> = new EventEmitter<object>();
  @Output()
  onDblClick: EventEmitter<object> = new EventEmitter<object>();

  defaultWidth: number;
  columns: IViewEngineColumn[] = [];

  activate(): void {
    const { attributes } = this;
    if (attributes && attributes.length > 0) {
      for (const field of attributes) {
        if (field.isVisible && field.isColumnVisible) {
          this.columns.push(field);
        }
      }
      this.defaultWidth = this.getTotalWidth();
    }
  }

  getTotalWidth(): number {
    let width = 100;
    let quantity = this.columns.length;
    for (const column of this.columns) {
      if (column.sizePercent && column.sizePercent > 0) {
        width -= column.sizePercent;
        quantity--;
      }
    }
    return width / quantity;
  }

  onRecordClick(record?: object) {
    if (record) {
      this.onSelectRecord.emit(record);
    }
  }

  onRecordDblClick(record?: object) {
    if (record) {
      this.onDblClick.emit(record);
    }
  }

  ngOnInit() {
    this.activate();
  }
}
