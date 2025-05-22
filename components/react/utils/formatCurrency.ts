/**
 * @export
 * @description A function to format an value to locale currency
 * @returns an number to show the correct value with format
 * @version 0.0.0
 * @since 0.0.0
 */
export const formatCurrency = (value: number | null | undefined) => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return null
}
