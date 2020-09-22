import { Injectable } from '@angular/core';
import { EditPanelComponent } from '../edit-panel.component';

@Injectable()
export class EditPanelService {

    private editPanels: EditPanelComponent[] = [];

    constructor() {
    }

    addPanel(panel: EditPanelComponent) {
        this.editPanels.push(panel);
    }

    removePanel(panel: EditPanelComponent) {
        this.editPanels = this.editPanels.filter(editPanel => {
            if (editPanel.code !== panel.code) {
                return editPanel;
            }
        });
    }

    getPanel(panelCode: number): EditPanelComponent {
        const editPanel = this.editPanels.find(panel => panel.code === panelCode);
        if (editPanel) {
            return editPanel;
        } else {
            throw new Error('Panel not found');
        }
    }

}
