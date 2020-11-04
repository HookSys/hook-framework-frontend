import { async } from '@angular/core/testing'
import { ViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.decorator'
import { IViewEngineDbTableHandler } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface'

@ViewEngineDbTable({
  id: 13,
})
export class LayoutsForm implements IViewEngineDbTableHandler {
  async onBeforeLoad() {
    return true
  }

  async onBeforeSave(dbtable) {
    return false
  }
}
