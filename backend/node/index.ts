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
    shippingBar: number
  }
}
export default new Service({
  clients,
  routes,
  graphql: {
    resolvers: {
      Query: {
        getShippingBar: async (_, __, ctx) => {

          const settings = await ctx.clients.apps.getAppSettings(process.env.VTEX_APP_ID ?? '') as {
            shippingBar: number
          }

          if (settings.shippingBar) {
            return settings.shippingBar
          }

          return null
        },
      },
    }
  }
})
