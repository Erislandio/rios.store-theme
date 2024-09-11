import { ONLY_NUMBERS_REGEX, ONLY_LETTERS_REGEX } from '@constants'

/**
 * @description Remove letters from a string.
 * @param value String value.
 * @returns The string with only numbers.
 * @version 1.0.0
 */
export const onlyNumbers = (value: string) =>
  value.replace(ONLY_NUMBERS_REGEX, '')

/**
 * @description Remove numbers from a string.
 * @param value String value.
 * @returns The string without numbers.
 * @version 1.0.0
 */
export const onlyLetters = (value: string) =>
  value.replace(ONLY_LETTERS_REGEX, '')
