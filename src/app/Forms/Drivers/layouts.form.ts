import { ViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.decorator'
import { IViewEngineDbTableHandler } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface'

@ViewEngineDbTable({
  id: 3,
})
export class LayoutsForm implements IViewEngineDbTableHandler {
  async onBeforeLoad() {
    return true
  }

  onDblClick(dbtable, data) {
    console.log(dbtable, data)
  }
}
