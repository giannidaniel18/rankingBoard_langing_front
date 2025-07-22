import { useState, useEffect } from 'react';
import { waitListService } from '../services/waitList.service';
import { Category, WaitListDTO } from '../types';
import toast from 'react-hot-toast';

export const useWaitList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await waitListService.getWaitListGames();
      setCategories(data);
    } catch (error) {
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const submitWaitList = async (data: WaitListDTO) => {
    try {
      setSubmitting(true);
      await waitListService.create(data);
      toast.success('¡Te uniste a la lista de espera exitosamente!');
      return true;
    } catch (error) {
      toast.error('Error al unirse a la lista de espera');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    categories,
    loading,
    submitting,
    submitWaitList,
  };
};