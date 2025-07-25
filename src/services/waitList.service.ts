import http from "../config/http";

import { GameFromApi, WaitListDTO, WaitListEntry } from "../types/waitList";

export const waitListService = {
  async getWaitListGames(): Promise<GameFromApi[]> {
    try {
      const response = await http.get("/api/Game?offset=0&limit=100");
      return response.data.results;
    } catch (error) {
      console.error("Error fetching waitlist games:", error);
      throw new Error("Failed to fetch games");
    }
  },

  async getAll(): Promise<WaitListEntry[]> {
    try {
      const response = await http.get("/waitlist");
      return response.data;
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      throw new Error("Failed to fetch waitlist entries");
    }
  },

  async create(data: WaitListDTO): Promise<string> {
    try {
      const response = await http.post("/api/WaitList", data);
      return response.data;
    } catch (error) {
      console.error("Error creating waitlist entry:", error);
      throw new Error("Failed to create waitlist entry");
    }
  },
};
