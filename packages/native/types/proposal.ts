import * as t from 'io-ts'

const NumericID = new t.Type(
  'NumericID',
  t.string.is,
  (i: any, c) => {
    const typeOfI = typeof i
    const isNumberOString = typeOfI === 'number' || typeOfI === 'string'
    return (isNumberOString && !isNaN(i))  ? t.success(i.toString()) : t.failure(i, c)
  },
  String
)

const Proposal = t.type({
  id: NumericID,
  name: t.string,
  value: t.number
}, 'Proposal')

export type Proposal = t.TypeOf<typeof Proposal>

export const Proposals = t.array(Proposal, 'Proposals')

export type Proposals = t.TypeOf<typeof Proposals>
