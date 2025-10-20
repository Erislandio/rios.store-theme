import { queries as compreJuntoQueries } from './compre-junto'

export const resolvers = {
  Mutation: {
    doNotCall: () => true,
  },
  Query: {
    getShippingBar: async (_: any, __: any, ctx: any) => {
      const settings = (await ctx.clients.apps.getAppSettings(
        process.env.VTEX_APP_ID ?? ''
      )) as {
        shippingBar: number
      }

      if (settings.shippingBar) {
        return settings.shippingBar
      }

      return null
    },
    ...compreJuntoQueries,
  },
}
