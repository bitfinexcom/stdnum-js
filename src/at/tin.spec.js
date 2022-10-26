import { validate, format } from './tin'
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions'

describe('at/tin', () => {
  it('format:591199013', () => {
    const result = format('591199013')

    expect(result).toEqual('59-119/9013')
  })

  it('validate:59-119/9013', () => {
    const result = validate('59-119/9013')

    expect(result.isValid && result.compact).toEqual('591199013')
  })

  it('validate:660-3', () => {
    const result = validate('660-3')

    expect(result.error).toBeInstanceOf(InvalidLength)
  })

  it('validate:59-119/9012', () => {
    const result = validate('59-119/9012')

    expect(result.error).toBeInstanceOf(InvalidChecksum)
  })

  it('validate:00-119/9012', () => {
    const result = validate('00-119/9012')

    expect(result.error).toBeInstanceOf(InvalidComponent)
  })

  it.each([
    '98-123/4560',
    '90-123/4567',
    '12-987/6546',
    '46-376/5321',
    '03-826/1574',
    '54-267/9451',
    '03 318/8822',
    '109999102',
    '12 035/4980',
    '12 504/1558',
    '12 528/1691',
    '22 283/3014',
    '29 122/4046',
    '38-999/9384',
    '41 248/1145',
    '46 1744591',
    '52-123/4567',
    '52-360/5855',
    '53 226/8059',
    '54 202/0565',
    '59 059/6383',
    '59 119/9013',
    '59 149/7540',
    '61 075/1679',
    '68 481/8826',
    '68 545 4266',
    '68 626/5406',
    '68 649/8114',
    '72 222/3526',
    '81 - 590/9908',
    '91 166/9307',
    '91 195/7272',
    '98 0100127',
    '98 0207336',
    '98 0300131',
    '98 0400378',
    '98 0500219',
    '98 0600092',
    '98 0700306',
    '98 0800130',
    '98 0900096',
    '98 1000284',
    '98 1100803',
    '98 1200363',
    '98 1300460',
    '98 1400534',
    '98 1500234',
    '98 1600042',
    '98 1700198',
    '98 1800212',
    '98 1900087',
    '98 2017196',
    '98 2102535',
    '98 2210643',
    '98 2300873',
    '98 2400038',
    '98 2500597',
    '98 2612509',
    '98 2700601',
    '98 2800047',
    '98 2900110',
    '98 3001314',
    '98 3100249',
    '98 3200445',
    '98 3300104',
    '98 3400326',
    '98 3500091',
    '98 3601303',
    '98 3700030',
    '98 3800194',
    '98 3900234',
    '98 4000257',
    '98 4100164',
    '98 4200287',
    '98 4300152',
    '98 4400010',
    '98 4500207',
    '98 4600254',
    '98 4700211',
    '98 4800318',
    '98 4900050',
    '98 5000157',
    '98 5100411',
    '98 5201573',
    '98 5300227',
    '98 5400027',
    '98 5500701',
    '98 5600360',
    '98 9300280',
    '98 9300363',
    '98 9300454',
    '98 9300579',
    '98 9300686',
    '98 9300736',
    '98 9300801',
    '98 9300819',
    '98 9300827',
    '98 9300850',
    '98 9300868',
    '98 9301015',
    '98 9301080',
    '98 9301155',
    '98 9301189',
    '98 9301247',
    '98 9301270',
    '98 9301304',
    '98 9301387',
    '98 9301528',
    '98 9301593',
    '98 9301676',
    '98 9301684',
    '98 9301841',
    '98 9301908',
    '98 9302021',
    '98 9302104',
    '98 9302161',
    '98 9302286',
    '98 9302310',
    '98 9302450',
    '98 9302500',
    '98 9302559',
    '98 9302690',
    '98 9302807',
    '98 9302831',
    '98 9302864',
    '98 9302914',
    '98 9302963',
    '98 9303086',
  ])('validate:%s', (testcase) => {
    const result = validate(testcase)

    expect(result.isValid).toBeTruthy()
  })
})
