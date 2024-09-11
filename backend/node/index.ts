import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'
import { Clients } from './clients'
import { resolvers } from './resolvers'

const TIMEOUT_MS = 10 * 1000

declare global {
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers,
  },
})
