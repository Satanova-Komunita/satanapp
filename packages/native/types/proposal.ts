import * as t from 'io-ts'

const Proposal = t.type({
  id: t.string,
  name: t.string,
  value: t.number
}, 'Proposal')

export type Proposal = t.TypeOf<typeof Proposal>

export const Proposals = t.array(Proposal, 'Proposals')

export type Proposals = t.TypeOf<typeof Proposals>
