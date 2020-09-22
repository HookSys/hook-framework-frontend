import { IViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ViewEngineDbTableHandler } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.handler';

@Component({
  selector: 've-form',
  templateUrl: './ve-form.component.html',
  styleUrls: ['./ve-form.component.scss']
})
export class ViewEngineFormComponent implements OnInit {
  @Input('form')
  public form: IViewEngineDbTable;
  public isVisible: boolean = false;

  constructor(private formService: ViewEngineDbTableHandler) {}

  ngOnInit() {
    this.formService.fireOnBeforeLoad(this.form).then((response) => {
      this.isVisible = response
    })
  }
}
