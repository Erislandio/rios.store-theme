import type { ClientsConfig, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'
import { routes } from './routes'

import { Clients } from './clients'

const TIMEOUT_MS = 20000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  interface State extends RecorderState {
    postalCode: string
    regionId: string
    userAddress: VtexPostalCodeResponse
  }
}
export default new Service({
  clients,
  routes,
})
