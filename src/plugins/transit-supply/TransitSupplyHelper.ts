import AsyncWorkerConnector from '@/util/AsyncWorkerConnector'
import { INITIALIZE } from '@/util/AsyncBackgroundWorker'
import BackgroundWorker from './TransitSupplyHelper.worker'
import { InitParams, MethodNames } from './TransitSupplyHelperContract'

export default class TransitSupplyHelper extends AsyncWorkerConnector {
  constructor() {
    super(new BackgroundWorker())
  }

  public static async create(params: InitParams) {
    const helper = new TransitSupplyHelper()
    await helper.initialize(params)
    return helper
  }

  public async createNodesAndLinks() {
    return this.postAsyncWorkerMessage(MethodNames.CreateNodesAndLinks, {})
  }

  public async convertCoordinates() {
    return this.postAsyncWorkerMessage(MethodNames.ConvertCoordinates, {})
  }

  public async processTransit() {
    return this.postAsyncWorkerMessage(MethodNames.ProcessTransit, {})
  }

  private async initialize(params: InitParams) {
    await this.postAsyncWorkerMessage(INITIALIZE, params)
  }
}
