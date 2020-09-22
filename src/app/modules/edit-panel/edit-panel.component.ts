import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Metadata } from './types';
import { FieldTypes, PanelModes } from './enums';
import { EditPanelService } from './services';
import { EventsManager } from './managers/events.manager';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit, OnDestroy {

  @Input()
  code: number;

  metadata: Metadata;
  regs: any[] = [];

  mode: PanelModes = PanelModes.GRID;
  selectedReg: any;

  events: EventsManager;

  constructor(private editPanelService: EditPanelService) {
    this.events = new EventsManager();
  }

  ngOnInit() {
    this.editPanelService.addPanel(this);
    this.metadata = {
      name: 'layout',
      size: 12,
      pkField: 'code',
      fields: [{
        name: 'code',
        label: 'Código',
        line: 1,
        size: 3,
        position: 1,
        sizePercent: 3,
        readOnly: true,
        type: FieldTypes.EDIT
      }, {
        name: 'desc',
        label: 'Descrição',
        line: 1,
        size: 3,
        position: 2,
        readOnly: true,
        type: FieldTypes.EDIT
      }, {
        name: 'createdAt',
        label: 'Criado em',
        line: 1,
        size: 3,
        position: 3,
        readOnly: true,
        type: FieldTypes.DATETIME,
      }, {
        name: 'updatedAt',
        label: 'Atualizado em',
        line: 1,
        size: 3,
        position: 4,
        readOnly: true,
        type: FieldTypes.DATETIME
      }, {
        name: 'createdBy',
        label: 'Criado por',
        line: 2,
        size: 3,
        position: 5,
        readOnly: true,
        type: FieldTypes.EDIT
      }, {
        name: 'updatedBy',
        label: 'Atualizado por',
        line: 2,
        size: 3,
        position: 6,
        readOnly: true,
        type: FieldTypes.EDIT
      }]
    };
  }

  ngOnDestroy() {
    this.editPanelService.removePanel(this);
  }

  onInputFocus(event: any) {
    this.events.fireOnFocus(event);
  }

  onInputBlur(event: any) {
    this.events.fireOnBlur(event);
  }

  onInputChange(event: any) {
    this.events.fireOnChange(event);
  }

  onEdit() {
    this.mode = PanelModes.EDIT;
  }

  onCancel() {
    this.selectedReg = null;
    this.mode = PanelModes.GRID;
  }

  onAdd() {
    let nextIndex = 0;
    if (this.regs.length > 0) {
      nextIndex = this.regs.reduce((prev, current) => {
        if (prev[this.metadata.pkField] > current[this.metadata.pkField]) {
          return prev;
        } else {
          return current;
        }
      })[this.metadata.pkField];
    }

    this.selectedReg = {
      [this.metadata.pkField]: nextIndex + 1
    };
    this.mode = PanelModes.NEW;
  }

  onSave(newReg: any) {
    if (this.mode === PanelModes.NEW) {
      this.regs.push(newReg);
    } else if (this.mode === PanelModes.EDIT) {
      this.regs = this.regs.map(reg => {
        if (reg[this.metadata.pkField] === newReg[this.metadata.pkField]) {
          return newReg;
        }
        return reg;
      });
    }
    this.mode = PanelModes.GRID;
  }

  onSelectReg(reg: any) {
    this.selectedReg = reg;
  }
}
