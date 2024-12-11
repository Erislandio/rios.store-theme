import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class SessionClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        'Proxy-Authorization': ctx.authToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Vtex-Use-Https': 'true',
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  public updateRegionId = <T>(
    value: string,
    segmentToken: string,
    sessionToken: string
  ) => {
    const data = { public: { regionId: value } }

    return this.http.postRaw<T>(`/api/sessions`, data, {
      headers: {
        Cookie: `vtex_segment=${segmentToken};vtex_session=${sessionToken}`,
      },
    })
  }
}
