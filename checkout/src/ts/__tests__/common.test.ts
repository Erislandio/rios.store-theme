import { onlyLetters, onlyNumbers } from '../utils/common'

// Mocks
const ALL_CHARACTERS =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const ALL_NUMBERS = '0123456789'

describe('Commom Helpers', () => {
  it('Should only contain letters', () => {
    expect(onlyLetters(ALL_CHARACTERS)).toBe(ALL_LETTERS)
  })

  it('Should only contain numbers', () => {
    expect(onlyNumbers(ALL_CHARACTERS)).toBe(ALL_NUMBERS)
  })
})
