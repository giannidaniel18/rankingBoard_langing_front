export interface Game {
  id: number;
  name: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  games: Game[];
}

export interface WaitListGameSelection {
  gameId?: number;
  gameName?: string;
  categoryId: number;
}

export interface WaitListDTO {
  email: string;
  games: WaitListGameSelection[];
}

export interface WaitListFormData {
  email: string;
  selectedGames: Record<string, boolean>;
  customGames: Record<string, string>;
}