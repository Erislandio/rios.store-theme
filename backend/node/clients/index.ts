import { IOClients } from '@vtex/api'
import HttpStatus from './status'

export class Clients extends IOClients {
  public get HttpStatus() {
    return this.getOrSet('HttpStatus', HttpStatus)
  }
}
