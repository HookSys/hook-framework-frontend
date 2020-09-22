import { ViewEngineDbTable } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.decorator'
import { IViewEngineDbTableHandler } from 'view-engine/components/organisms/ve-dbtable/ve-dbtable.interface'

@ViewEngineDbTable({
  id: 1,
})
export class DriversForm implements IViewEngineDbTableHandler {
  async onBeforeLoad() {
    return true
  }

  onDblClick(dbtable, data) {
    console.log(dbtable, data)
  }
}
