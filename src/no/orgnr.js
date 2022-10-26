/**
 * Orgnr (Organisasjonsnummer, Norwegian organisation number).
 *
 * The Organisasjonsnummer is a 9-digit number with a straightforward check
 * mechanism.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions'
import { strings, weightedSum } from '../util'

function clean(input) {
  return strings.cleanUnicode(input, ' -/')
}

const impl = {
  name: 'Norwegian Organization Number',
  localName: 'Organisasjonsnummer',
  abbreviation: 'Orgnr',

  compact(input) {
    const [value, err] = clean(input)

    if (err) {
      throw err
    }

    return value
  },

  format(input) {
    const [value] = clean(input)

    return strings.splitAt(value, 3, 6).join(' ')
  },

  validate(input) {
    const [value, error] = clean(input)

    if (error) {
      return { isValid: false, error }
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() }
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() }
    }

    const sum = weightedSum(value, {
      weights: [3, 2, 7, 6, 5, 4, 3, 2, 1],
      modulus: 11,
    })

    if (sum !== 0) {
      return { isValid: false, error: new exceptions.InvalidChecksum() }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    }
  },
}

export const {
  name, localName, abbreviation, validate, format, compact,
} = impl
export default impl
