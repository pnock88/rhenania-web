export type MatchTeam = {
  name: string
  logo: string
}

export type MatchItem = {
  id: number
  team: 'first' | 'second'
  competition: string
  date: string
  dateLabel: string
  time: string
  location: string
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  homeScore?: number
  awayScore?: number
  status: 'upcoming' | 'finished' | 'cancelled'
}

export const matches: MatchItem[] = [
  {
    id: 1,
    team: 'first',
    competition: 'Kreisliga A',
    date: '2026-08-15T15:00:00',
    dateLabel: 'Samstag, 15. August 2026',
    time: '15:00 Uhr',
    location: 'Sportanlage Sandheide',
    homeTeam: {
      name: 'SC Rhenania Hochdahl',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'TSV 05 Ratingen',
      logo: '/images/logos/opponent.png',
    },
    status: 'upcoming',
  },
  {
    id: 2,
    team: 'second',
    competition: 'Kreisliga C',
    date: '2026-08-16T13:00:00',
    dateLabel: 'Sonntag, 16. August 2026',
    time: '13:00 Uhr',
    location: 'Sportanlage Sandheide',
    homeTeam: {
      name: 'SC Rhenania Hochdahl II',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'TuS 08 Langenberg II',
      logo: '/images/logos/opponent-2.png',
    },
    status: 'upcoming',
  },
  {
    id: 3,
    team: 'first',
    competition: 'Kreisliga A',
    date: '2026-08-22T15:30:00',
    dateLabel: 'Samstag, 22. August 2026',
    time: '15:30 Uhr',
    location: 'Sportplatz am Stadtwald',
    homeTeam: {
      name: 'FC Hochdahl',
      logo: '/images/logos/opponent.png',
    },
    awayTeam: {
      name: 'SC Rhenania Hochdahl',
      logo: '/images/logos/rhenania.png',
    },
    status: 'upcoming',
  },
  {
    id: 4,
    team: 'first',
    competition: 'Kreisliga A',
    date: '2026-05-10T15:00:00',
    dateLabel: 'Sonntag, 10. Mai 2026',
    time: '15:00 Uhr',
    location: 'Sportanlage Sandheide',
    homeTeam: {
      name: 'SC Rhenania Hochdahl',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'SV Erkrath',
      logo: '/images/logos/opponent.png',
    },
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
  },
  {
    id: 5,
    team: 'second',
    competition: 'Kreisliga C',
    date: '2026-05-09T13:00:00',
    dateLabel: 'Samstag, 9. Mai 2026',
    time: '13:00 Uhr',
    location: 'Sportanlage Sandheide',
    homeTeam: {
      name: 'SC Rhenania Hochdahl II',
      logo: '/images/logos/rhenania.png',
    },
    awayTeam: {
      name: 'DJK Grün-Weiß II',
      logo: '/images/logos/opponent-2.png',
    },
    homeScore: 2,
    awayScore: 2,
    status: 'finished',
  },
]