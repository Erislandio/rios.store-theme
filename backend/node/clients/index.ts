import { IOClients } from '@vtex/api'
import Catalog from './catalog'

export class Clients extends IOClients {
  public get CustomCatalog() {
    return this.getOrSet('CustomCatalog', Catalog)
  }
}
