export type RegistrationType = 'initial' | 'transfer'

export type MembershipGender =
  | 'male'
  | 'female'
  | 'diverse'

export type MembershipRequest = {
  registrationType: RegistrationType
  previousClub?: string

  playerLastName: string
  playerFirstName: string
  gender: MembershipGender
  playerStreet: string
  playerZip: string
  playerCity: string
  birthDate: string
  birthPlace: string
  nationality: string

  guardianLastName: string
  guardianFirstName: string
  guardianStreet: string
  guardianZip: string
  guardianCity: string
  guardianEmail: string
  guardianPhone: string

  accountHolder: string
  iban: string
  bankName: string

  team: string
  message?: string
  privacyAccepted: boolean
}

export type PreparedMembershipRequest =
  MembershipRequest & {
    requestNumber: string
    createdAt: Date
  }