import { IViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IViewEngineColumn } from './ve-grid.interface';

@Component({
  selector: 'app-ve-grid',
  templateUrl: './ve-grid.component.html',
  styleUrls: ['./ve-grid.component.scss']
})
export class ViewEngineGridComponent implements OnInit {
  @Input('metadata')
  public metadata: IViewEngineDbTable;
  @Input('data')
  public data: Array<any>;
  @Input('selected')
  public selected: any;
  @Output('select')
  public select = new EventEmitter<any>();
  @Output('sdclick')
  public sdclick = new EventEmitter<any>();

  public defaultWidth: number;
  public columns: IViewEngineColumn[];

  constructor() {
  }

  public onDblClick(reg: any): void {
    this.sdclick.emit(reg);
  }

  public onLineClick(reg: any): void {
    this.select.emit(reg);
  }

  private loadGrid(): void {
    if (this.metadata.fields) {
      const fields = this.metadata.fields.sort((field2, field1) => {
        if (field1.position < field2.position) {
          return 1;
        } else if (field1.position > field2.position) {
          return -1;
        }
        return 0;
      });

      for (const field of fields) {
        if (field.isVisible) {
          if (Array.isArray(this.columns)) {
            this.columns.push(field);
          } else {
            this.columns = [field];
          }
        }
      }
      this.defaultWidth = this.getTotalWidth();
    }
  }

  private getTotalWidth(): number {
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

  public makeOrder(col: IViewEngineColumn): void {
    if (!this.data || this.data.length === 0) {
      return;
    }
    this.columns = this.columns.map((column: IViewEngineColumn) => {
      if (column.id !== col.id) {
        column.sort = null;
      }
      return column;
    });
    if (col.sort === 'asc') {
      col.sort = 'desc';
      this.data = this.data.sort((line1: any, line2: any) => {
        if (line1[col.name] < line2[col.name]) {
          return 1;
        } else if (line1[col.name] > line2[col.name]) {
          return -1;
        }
        return 0;
      });
    } else if (col.sort === 'desc' || !col.sort) {
      col.sort = 'asc';
      this.data = this.data.sort((line1: any, line2: any) => {
        if (line1[col.name] > line2[col.name]) {
          return 1;
        } else if (line1[col.name] < line2[col.name]) {
          return -1;
        }
        return 0;
      });
    }
  }

  ngOnInit() {
    this.loadGrid();
  }

}
