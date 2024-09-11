import { resolvers } from '../resolvers'
import mockedStatus from '../__mocks__/status'

describe('Status Resolver', () => {
  it('Should return an status response', async () => {
    const ctx = {
      clients: {
        HttpStatus: {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          status: (_: number) => Promise.resolve(mockedStatus),
        },
      },
    } as Context

    const result = await resolvers.Query.status(null, { statusCode: 200 }, ctx)

    expect(result).toEqual(mockedStatus)
  })
})
