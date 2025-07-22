import { Category } from '../types';

export const competitiveCategories: Category[] = [
  {
    id: 1,
    name: 'eSports',
    games: [
      { id: 1, name: 'League of Legends', categoryId: 1 },
      { id: 2, name: 'Valorant', categoryId: 1 },
      { id: 3, name: 'Dota 2', categoryId: 1 },
      { id: 4, name: 'Counter-Strike 2', categoryId: 1 },
      { id: 5, name: 'Overwatch 2', categoryId: 1 },
      { id: 6, name: 'Fortnite', categoryId: 1 },
      { id: 7, name: 'Rocket League', categoryId: 1 },
      { id: 8, name: 'Call of Duty', categoryId: 1 },
      { id: 9, name: 'StarCraft II', categoryId: 1 },
      { id: 10, name: 'Rainbow Six Siege', categoryId: 1 },
      { id: 11, name: 'FC 25', categoryId: 1 },
      { id: 12, name: 'Medal of Honor', categoryId: 1 },
    ],
  },
  {
    id: 2,
    name: 'Sports',
    games: [
      { id: 13, name: 'Fútbol', categoryId: 2 },
      { id: 14, name: 'Paddle', categoryId: 2 },
      { id: 15, name: 'Tenis', categoryId: 2 },
      { id: 16, name: 'Básquet', categoryId: 2 },
      { id: 17, name: 'Voley', categoryId: 2 },
      { id: 18, name: 'Hockey', categoryId: 2 },
      { id: 19, name: 'Rugby', categoryId: 2 },
      { id: 20, name: 'Golf', categoryId: 2 },
    ],
  },
  {
    id: 3,
    name: 'BoardGames',
    games: [
      { id: 21, name: 'Ajedrez', categoryId: 3 },
      { id: 22, name: 'Monopoly', categoryId: 3 },
      { id: 23, name: 'Risk', categoryId: 3 },
      { id: 24, name: 'Scrabble', categoryId: 3 },
      { id: 25, name: 'Catan', categoryId: 3 },
      { id: 26, name: 'Uno', categoryId: 3 },
      { id: 27, name: 'Poker', categoryId: 3 },
      { id: 28, name: 'Truco', categoryId: 3 },
    ],
  },
];