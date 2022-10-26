/**
 * SIRET (a French company establishment identification number).
 *
 * The SIRET (Système d'Identification du Répertoire des Établissements)
 * is a 14 digit number used to identify French companies' establishments
 * and facilities. The Luhn checksum is used to validate the numbers.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions'
import { strings } from '../util'
import { luhnChecksumValidate } from '../util/checksum'

function clean(input) {
  return strings.cleanUnicode(input, ' -/')
}

const impl = {
  name: 'French Company Establishment Identification Number',
  localName: "Système d'Identification du Répertoire des Établissements",
  abbreviation: 'SIRET',
  compact(input) {
    const [value, err] = clean(input)

    if (err) {
      throw err
    }

    return value
  },

  format(input) {
    const [value] = clean(input)

    return strings.splitAt(value, 3, 6, 9).join(' ')
  },

  validate(input) {
    const [value, error] = clean(input)

    if (error) {
      return { isValid: false, error }
    }
    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() }
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() }
    }

    if (!luhnChecksumValidate(value)) {
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
