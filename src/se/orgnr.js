/**
 * Orgnr (Organisationsnummer, Swedish company number).
 *
 * The Orgnr (Organisationsnummer) is the national number to identify Swedish
 * companies and consists of 10 digits. These are the first 10 digits in the
 * Swedish VAT number, i.e. it's the VAT number without the 'SE' in front and
 * the '01' at the end.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions'
import { strings } from '../util'
import { luhnChecksumValidate } from '../util/checksum'

function clean(input) {
  return strings.cleanUnicode(input, ' -.')
}

const impl = {
  name: 'Swedish Company Number',
  localName: 'Organisationsnummer',
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

    return strings.splitAt(value, -4).join('-')
  },

  validate(input) {
    const [value, error] = clean(input)

    if (error) {
      return { isValid: false, error }
    }
    if (value.length !== 10) {
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
