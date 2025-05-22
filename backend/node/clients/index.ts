import { IOClients } from '@vtex/api'
import { SessionClient } from './session-client'
import Regions from './vtex-region'

export class Clients extends IOClients {
  public get Regions() {
    return this.getOrSet('Regions', Regions)
  }
  public get SessionClient() {
    return this.getOrSet('SessionClient', SessionClient)
  }
}
