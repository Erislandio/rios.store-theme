import { IOClients } from '@vtex/api'
import Regions from './vtex-region'

export class Clients extends IOClients {
  public get Regions() {
    return this.getOrSet('Regions', Regions)
  }
}
