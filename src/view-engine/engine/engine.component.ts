import { Component, Input } from '@angular/core';
@Component({
  selector: 'view-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class ViewEngineComponent {
  @Input()
  public feature;
}
