import { IViewEngineDbTableParam } from './../../organisms/ve-dbtable/ve-dbtable.interface';
import { IViewEngineAction } from './../../../interfaces/ve.interface';
import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { IViewEngineDbTable, IViewEngineOpenRecordEvent } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface';

interface IViewEnginePanels {
  id: number;
  size: number;
  metadata: IViewEngineDbTable;
  record: IViewEngineDbTableParam;
}

@Component({
  selector: 've-panel',
  templateUrl: './ve-panel.component.html',
  styleUrls: ['./ve-panel.component.scss'],
})
export class ViewEnginePanelComponent implements OnInit {
  @Input()
  entrypoint: IViewEngineDbTable;

  public panels: IViewEnginePanels[] = [];

  constructor() {
  }

  private isPanelAlreadyOpened(id: number): boolean | number {
    const opened = this.panels.findIndex((p) => p.id === id);
    return opened >=0 || false
  }

  public ngOnInit() {
    this.panels = this.panels.concat([{
      id: this.entrypoint.id,
      size: this.entrypoint.size,
      metadata: this.entrypoint,
      record: {}
    }])
  }

  public openPanel(event: IViewEngineOpenRecordEvent): void {
    const { children, data } = event
    const isOpened = this.isPanelAlreadyOpened(children.id);
    if (isOpened) {
      this.panels = this.panels.map((p) => {
        if (p.id === children.id) {
          return {
            ...p,
            record: data
          }
        }
        return p
      })
    } else {
      this.panels = this.panels.concat([{
        id: children.id,
        size: children.size,
        metadata: children,
        record: data
      }])
    }

  }
}
