import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class HttpStatus extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://httpstat.us', context, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Vtex-Use-Https': 'true',
      },
      ...options,
    })
  }

  public status(statusCode: number): Promise<HttpStatusResponse> {
    return this.http.get<HttpStatusResponse>(`/${statusCode}`)
  }
}
