export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  image: string
  category: string
  date: string
  publishedAt: string
  featured?: boolean
}

export const newsItems: NewsItem[] = [
  {
    slug: 'aktionstag',
    title: 'Aktionstag ein voller Erfolg',
    excerpt:
      'Tolles Wetter, viele Besucher und jede Menge Fußball: Unser Aktionstag war ein voller Erfolg.',
    content: [
      'Unser diesjähriger Aktionstag lockte zahlreiche Mitglieder, Familien und Gäste auf die Sportanlage Sandheide.',
      'Neben verschiedenen Fußballangeboten sorgten viele ehrenamtliche Helferinnen und Helfer für ein abwechslungsreiches Programm und die passende Verpflegung.',
      'Wir bedanken uns bei allen Beteiligten, Unterstützern und Gästen für einen rundum gelungenen Tag.',
    ],
    image: '/images/news/news-1.jpg',
    category: 'Verein',
    date: '18. Mai 2025',
    publishedAt: '2025-05-18',
    featured: true,
  },
  {
    slug: 'stadtmeisterschaft',
    title: 'Stadtmeisterschaft gewonnen',
    excerpt:
      'Unsere erste Mannschaft sichert sich nach einer starken Leistung den Titel.',
    content: [
      'Unsere erste Mannschaft hat die Stadtmeisterschaft nach überzeugenden Auftritten für sich entschieden.',
      'Die Mannschaft zeigte über das gesamte Turnier hinweg große Geschlossenheit, Einsatzbereitschaft und Spielfreude.',
      'Herzlichen Glückwunsch an das gesamte Team und Trainerteam.',
    ],
    image: '/images/news/news-2.jpg',
    category: 'I. Mannschaft',
    date: '12. Mai 2025',
    publishedAt: '2025-05-12',
  },
  {
    slug: 'neue-trikots',
    title: 'Neue Trikots für die E-Jugend',
    excerpt:
      'Unsere E-Jugend bedankt sich bei ihrem Sponsor für die neuen Trikots.',
    content: [
      'Die E-Jugend durfte sich über einen neuen Trikotsatz freuen.',
      'Die Mannschaft präsentierte die neuen Trikots erstmals beim Training und war von der Ausstattung begeistert.',
      'Wir bedanken uns herzlich bei unserem Sponsor für die Unterstützung unserer Nachwuchsarbeit.',
    ],
    image: '/images/news/news-3.jpg',
    category: 'Jugend',
    date: '8. Mai 2025',
    publishedAt: '2025-05-08',
  },
  {
    slug: 'mitgliederversammlung',
    title: 'Mitgliederversammlung 2025',
    excerpt:
      'Alle Informationen und Ergebnisse der diesjährigen Mitgliederversammlung.',
    content: [
      'Bei der diesjährigen Mitgliederversammlung wurden die Mitglieder über die aktuelle Entwicklung des Vereins informiert.',
      'Neben sportlichen und wirtschaftlichen Themen standen auch zukünftige Projekte und die weitere Nachwuchsarbeit auf der Tagesordnung.',
      'Das Protokoll und weitere Informationen werden den Mitgliedern separat zur Verfügung gestellt.',
    ],
    image: '/images/news/news-4.jpg',
    category: 'Verein',
    date: '3. Mai 2025',
    publishedAt: '2025-05-03',
  },
  {
    slug: 'trainer-gesucht',
    title: 'Trainerinnen und Trainer gesucht',
    excerpt:
      'Wir suchen Verstärkung für unsere Jugendmannschaften und freuen uns auf dich.',
    content: [
      'Für mehrere Jugendmannschaften suchen wir engagierte Trainerinnen, Trainer und Betreuer.',
      'Erfahrung ist hilfreich, aber nicht zwingend erforderlich. Besonders wichtig sind Freude an der Arbeit mit jungen Menschen und Zuverlässigkeit.',
      'Interessierte können sich jederzeit bei unserer Jugendleitung melden.',
    ],
    image: '/images/news/news-5.jpg',
    category: 'Ehrenamt',
    date: '28. April 2025',
    publishedAt: '2025-04-28',
  },
]