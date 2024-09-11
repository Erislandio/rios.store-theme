/**
 * @export
 * @description Converts a number to currency.
 * @param value The value to be converted into currency.
 * @param locale A locale string
 * @param currency Currency type.
 * @returns Formatted currency.
 * @example const price = formatCurrency(9.99)
 * @since 0.1.0
 * @version 1.0.0
 */
export const formatCurrency = (
  value: number,
  locale = 'pt-BR',
  currency = 'BRL'
): string => {
  return value
    .toLocaleString(locale, { style: 'currency', currency }) // Convert to currency.
    .replace(/\u00A0/g, ' ') // Replace NO-BREAK SPACE unidoce character with space.
}
