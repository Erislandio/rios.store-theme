import { formatCurrency } from '../utils/format-currency'

describe('Format Currency', () => {
  it('Should return a Brazilian currency', () => {
    expect(formatCurrency(9.99)).toContain('R$')
  })

  it('Should return a USA currency', () => {
    expect(formatCurrency(9.99, 'en-US', 'USD')).toBe('$9.99')
  })
})
