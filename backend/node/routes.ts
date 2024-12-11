import { method } from '@vtex/api'
import {
  getPostalCodeQuery,
  getRegionId,
  getUserAddress,
} from './middlewares/region'

export const routes = {
  setRegionId: method({
    GET: [getPostalCodeQuery, getRegionId, getUserAddress],
  }),
}
