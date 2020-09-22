import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Metadata, Column } from '../../types';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent implements OnChanges {

  @Input()
  metadata: Metadata;

  @Input()
  regs: any[] = [];

  @Input()
  selected: any;

  @Output('select')
  select = new EventEmitter<any>();

  columns: Column[] = [];
  defaultWidth: number;

  constructor() { }

  private onLineClick(reg: any): void {
    this.select.emit(reg);
  }

  private loadGrid(): void {
    if (this.metadata) {
      this.columns = [];
      for (const field of this.metadata.fields) {
        this.columns.push({
          name: field.name,
          label: field.label,
          position: field.position,
          sizePercent: field.sizePercent
        });
      }
      this.defaultWidth = this.getTotalWidth();
    }
  }

  private getTotalWidth(): number {
    let width = 100;
    let quantity = this.columns.length;
    for (const column of this.columns) {
      if (column.sizePercent) {
        width -= column.sizePercent;
        quantity--;
      }
    }
    return width / quantity;
  }

  public makeOrder(col: Column): void {
    if (!this.regs || this.regs.length === 0) {
      return;
    }
    this.columns = this.columns.map((column: Column) => {
      if (column.name !== col.name) {
        column.sort = null;
      }
      return column;
    });
    if (col.sort === 'asc') {
      col.sort = 'desc';
      this.regs = this.regs.sort((line1: any, line2: any) => {
        if (line1[col.name] < line2[col.name]) {
          return 1;
        } else if (line1[col.name] > line2[col.name]) {
          return -1;
        }
        return 0;
      });
    } else if (col.sort === 'desc' || !col.sort) {
      col.sort = 'asc';
      this.regs = this.regs.sort((line1: any, line2: any) => {
        if (line1[col.name] > line2[col.name]) {
          return 1;
        } else if (line1[col.name] < line2[col.name]) {
          return -1;
        }
        return 0;
      });
    }
  }

  ngOnChanges() {
    this.loadGrid();
  }

}
