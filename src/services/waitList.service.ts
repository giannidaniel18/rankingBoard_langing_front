import api from '../config/api';
import { WaitListDTO, Category } from '../types';
import { competitiveCategories } from '../constants/competitiveCategories';

export const waitListService = {
  async getWaitListGames(): Promise<Category[]> {
    try {
      // En un caso real, esto vendría de la API
      // const response = await api.get('/games/categories');
      // return response.data;
      
      // Por ahora retornamos los datos mock
      return competitiveCategories;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw new Error('Failed to fetch games');
    }
  },

  async create(data: WaitListDTO): Promise<void> {
    try {
      // En un caso real, esto sería el POST a la API
      // const response = await api.post('/waitlist', data);
      // return response.data;
      
      // Por ahora simulamos el envío exitoso
      console.log('Datos enviados a la waitlist:', data);
      
      // Simulamos un delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating waitlist entry:', error);
      throw new Error('Failed to join waitlist');
    }
  },
};