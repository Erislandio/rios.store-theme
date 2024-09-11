import status from './status'

export const resolvers = {
  Query: {
    ...status.queries,
  },
  /*
  Mutation: {
    ...status.mutations
  }
  */
}
