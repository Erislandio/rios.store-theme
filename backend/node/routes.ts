import { method } from '@vtex/api'
import { getPostalCodeQuery, getRegionId } from './middlewares'

export const routes = {
  setRegionId: method({
    GET: [getPostalCodeQuery, getRegionId],
  }),
}
