interface StatusArgs {
  statusCode: number
}

const queries = {
  status: async (
    _: unknown,
    args: StatusArgs,
    ctx: Context
  ): Promise<HttpStatusResponse> => {
    const {
      clients: { HttpStatus },
    } = ctx

    try {
      return await HttpStatus.status(args.statusCode)
    } catch (error) {
      return (
        error?.response?.data ?? {
          code: 400,
          description: 'Bad Request',
        }
      )
    }
  },
}

const mutations = {}

export default { queries, mutations }
