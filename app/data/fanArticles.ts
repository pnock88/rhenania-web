import type { FanArticle } from '~/types/shop'

export const fanArticles: FanArticle[] = [
  {
    id: 'jubilaeums-shirt',
    name: 'Jubiläums-T-Shirt',
    subtitle: '100 Jahre SC Rhenania',
    price: 18,
    image: '/images/fanartikel/jubilaeums-shirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Blau',
        value: '#305CDE',
      },
    ],
    badges: ['Jubiläum','NEU'],
  },
  {
    id: 'badeschlappen',
    name: 'Badeschlappen',
    price: 20,
    image: '/images/fanartikel/badeschlappen.jpg',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'rhenania-becher',
    name: 'Rhenania Becher',
    description: 'Für kalte und warme Getränke.',
    price: 17,
    image: '/images/fanartikel/becher.jpg',
  },
  {
    id: 'college-jacke',
    name: 'College Jacke',
    subtitle: 'Rhenania College Jacke',
    description:
      'Aufdruck vorne „RH“, auf der Rückseite „Rhenania Hochdahl“.',
    price: 40,
    image: '/images/fanartikel/college-jacke.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Royalblau',
        value: '#305CDE',
      },
    ],
    badges: ['NEU'],
    material: '70 % Baumwolle, 30 % Polyester',
  },
  {
    id: 'picknick-decke',
    name: 'Picknick-Decke',
    subtitle: 'Rhenania Fleece-Picknick-Decke',
    description: '110 × 180 cm, inklusive Tragegurt.',
    price: 27,
    image: '/images/fanartikel/picknick-decke.jpg',
    colors: [
      {
        name: 'Royalblau',
        value: '#305CDE',
      },
    ],
    material: '100 % Polyester',
  },
  {
    id: 'sportbeutel',
    name: 'Sportbeutel',
    subtitle: 'Rhenania Hochdahl Sportbeutel',
    price: 9,
    image: '/images/fanartikel/sportbeutel.jpg',
    colors: [
      {
        name: 'Navyblau mit weißem Druck',
        value: '#0F2D52',
      },
    ],
    material: '100 % Nylon',
  },
  {
    id: 'ultra-mama-shirt',
    name: 'Ultra-Mama-T-Shirt',
    subtitle: 'Rhenania Hochdahl Ultra Mamas',
    price: 17,
    image: '/images/fanartikel/ultra-mama-shirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Royalblau mit weißem Druck',
        value: '#305CDE',
      },
    ],
    material: '100 % Baumwolle',
  },
  {
    id: 'herren-shirt',
    name: 'Herren-T-Shirt',
    subtitle: 'Since 1925',
    price: 16.5,
    image: '/images/fanartikel/herren-shirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Schwarz mit weißem Druck',
        value: '#111827',
      },
    ],
    material: '100 % Baumwolle',
  },
  {
    id: 'damen-shirt',
    name: 'Damen-T-Shirt',
    subtitle: 'Since 1925',
    price: 16.5,
    image: '/images/fanartikel/damen-shirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Schwarz mit goldenem Druck',
        value: '#111827',
      },
    ],
    material: '100 % Baumwolle',
  },
  {
    id: 't-shirt-kollektion-2021',
    name: 'T-Shirt Kollektion 2021',
    subtitle: 'Blau oder Weiß',
    price: 16.5,
    image: '/images/fanartikel/t-shirt-blau.jpg',
    images: [
      {
        src: '/images/fanartikel/t-shirt-blau.jpg',
        alt: 'T-Shirt Kollektion 2021 in Blau',
        color: 'Blau mit weißem Druck',
      },
      {
        src: '/images/fanartikel/t-shirt-weiss.jpg',
        alt: 'T-Shirt Kollektion 2021 in Weiß',
        color: 'Weiß mit schwarzem Druck',
      },
    ],
    colors: [
      {
        name: 'Blau mit weißem Druck',
        value: '#305CDE',
      },
      {
        name: 'Weiß mit schwarzem Druck',
        value: '#FFFFFF',
      },
    ],
    material: '100 % Baumwolle',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'rhenania-basecap',
    name: 'Rhenania Basecap',
    subtitle: 'Für Frauen und Männer',
    price: 20,
    image: '/images/fanartikel/basecap.jpg',
    images: [
      {
        src: '/images/fanartikel/basecap_royal.png',
        alt: 'Blau',
        color: 'Blau',
      },
      {
        src: '/images/fanartikel/basecap_navy.png',
        alt: 'Navy',
        color: 'Navy',
      },
      {
        src: '/images/fanartikel/basecap.jpg',
        alt: 'Schwarz',
        color: 'Schwarz',
      },
      {
        src: '/images/fanartikel/basecap_white.png',
        alt: 'Weiß',
        color: 'Weiß',
      },
    ],
    colors: [
      {
        name: 'Blau',
        value: '#305CDE',
      },
      {
        name: 'Navy',
        value: '#000080',
      },
      {
        name: 'Schwarz',
        value: '#000000',
      },
      {
        name: 'Weiß',
        value: '#FFFFFF',
      },
    ],
    material: '63 % Polyester, 34 % Baumwolle, 3 % Elasthan',
  },
  {
    id: 'fan-shirt',
    name: 'Fan-Shirt',
    subtitle: 'Rhenania Hochdahl vs. Borussia Dortmund',
    price: 13.5,
    oldPrice: 18.5,
    image: '/images/fanartikel/fan-shirt.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Schwarz mit buntem Druck',
        value: '#111827',
      },
    ],
    material: '100 % Baumwolle',
    badges: ['Sonderpreis','reduziert'],
  },
  {
    id: 'fan-schal',
    name: 'Fan-Schal',
    subtitle: 'Rhenania Hochdahl',
    price: 11,
    image: '/images/fanartikel/fan-schal.jpg',
    material: '100 % Polyacryl',
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    subtitle: 'Since 1925',
    price: 32,
    image: '/images/fanartikel/hoodie.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      {
        name: 'Schwarz mit weißem Druck',
        value: '#111827',
      },
    ],
    material: '50 % Baumwolle, 50 % Polyester',
  },
  {
    id: 'wintermuetze',
    name: 'Wintermütze',
    subtitle: 'Mit Logodruck',
    price: 8,
    image: '/images/fanartikel/wintermuetze.jpg',
    colors: [
      {
        name: 'Dunkelblau',
        value: '#0F2D52',
      },
    ],
    material: '97 % Baumwolle, 3 % Elasthan',
  },
  {
    id: 'handschuhe',
    name: 'Handschuhe',
    subtitle: 'Mit Logodruck',
    price: 11,
    image: '/images/fanartikel/handschuhe.jpg',
    colors: [
      {
        name: 'Dunkelblau',
        value: '#0F2D52',
      },
    ],
    material: '100 % Polyester',
  },
  {
    id: 'aufkleber',
    name: 'Aufkleber',
    subtitle: 'Format 9,5 × 7,5 cm',
    price: 2.5,
    image: '/images/fanartikel/aufkleber.jpg',
    material: 'PVC-Folie',
  },
  {
    id: 'schluesselband',
    name: 'Schlüsselband',
    subtitle: 'Mit Karabinerhaken',
    price: 3,
    image: '/images/fanartikel/schluesselband.jpg',
    colors: [
      {
        name: 'Blau',
        value: '#305CDE',
      },
    ],
  },
  {
    id: 'rhenania-tasse',
    name: 'Rhenania Tasse',
    price: 8,
    image: '/images/fanartikel/tasse.jpg',
    colors: [
      {
        name: 'Weiß mit blau-schwarzem Druck',
        value: '#FFFFFF',
      },
    ],
    material: 'Keramik',
  },
]