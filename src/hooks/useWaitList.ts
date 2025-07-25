import { useState } from "react";
import { waitListService } from "../services/waitList.service";
import { GameCategory, GameFromApi, GamesData, WaitListDTO, WaitListEntry } from "../types/waitList";

export const useWaitList = () => {
  const [games, setGames] = useState<GamesData>();
  const [entries, setEntries] = useState<WaitListEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const gamesData = await waitListService.getWaitListGames();
      const gamesDataTransformed = transformToGamesData(gamesData);
      setGames(gamesDataTransformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching games");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const entriesData = await waitListService.getAll();
      setEntries(entriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching entries");
    } finally {
      setIsLoading(false);
    }
  };

  const createEntry = async (data: WaitListDTO): Promise<string> => {
    setIsLoading(true);
    setError(null);
    try {
      await waitListService.create(data);
      return "ok";
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error creating entry";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const transformToGamesData = (games: GameFromApi[]): GamesData => {
    const gamesByCategory = games.reduce((acc, game) => {
      const categoryId = game.category.id;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          id: game.category.id,
          title: game.category.name,
          options: [],
        };
      }
      acc[categoryId].options.push({
        id: game.id,
        name: game.name,
      });
      return acc;
    }, {} as Record<number, GameCategory>);

    // Add "Otros" option to each category
    const addOtrosOption = (category: GameCategory): GameCategory => ({
      ...category,
      options: [...category.options, { id: 0, name: "Otros" }],
    });

    return {
      esports: addOtrosOption(gamesByCategory[1] || { id: 1, title: "Esports", options: [] }),
      boardGames: addOtrosOption(gamesByCategory[2] || { id: 2, title: "Board Games", options: [] }),
      sports: addOtrosOption(gamesByCategory[3] || { id: 3, title: "Sports", options: [] }),
    };
  };
  return {
    games,
    entries,
    isLoading,
    error,
    fetchGames,
    fetchEntries,
    createEntry,
  };
};
