import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { z } from 'zod';
import { useWaitList } from '../hooks/useWaitList';
import { WaitListDTO, WaitListFormData } from '../types';

interface WaitListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const waitListSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const WaitListModal: React.FC<WaitListModalProps> = ({ isOpen, onClose }) => {
  const { categories, loading, submitting, submitWaitList } = useWaitList();
  const [formData, setFormData] = useState<WaitListFormData>({
    email: '',
    selectedGames: {},
    customGames: {},
  });
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({
    1: true, // eSports expanded by default
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleGameToggle = (gameKey: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGames: {
        ...prev.selectedGames,
        [gameKey]: !prev.selectedGames[gameKey],
      },
    }));
  };

  const handleCustomGameChange = (categoryId: number, value: string) => {
    const key = `custom_${categoryId}`;
    setFormData(prev => ({
      ...prev,
      customGames: {
        ...prev.customGames,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      waitListSchema.parse({ email: formData.email });

      const games = Object.entries(formData.selectedGames)
        .filter(([, selected]) => selected)
        .map(([gameKey]) => {
          if (gameKey.startsWith('game_')) {
            const gameId = parseInt(gameKey.replace('game_', ''));
            const game = categories
              .flatMap(cat => cat.games)
              .find(g => g.id === gameId);
            return { gameId, categoryId: game!.categoryId };
          } else if (gameKey.startsWith('other_')) {
            const categoryId = parseInt(gameKey.replace('other_', ''));
            const customKey = `custom_${categoryId}`;
            const customGame = formData.customGames[customKey];
            if (customGame?.trim()) {
              return { gameName: customGame.trim(), categoryId };
            }
          }
          return null;
        })
        .filter(Boolean) as any[];

      // Add custom games that have text but "Otros" checkbox is not selected
      Object.entries(formData.customGames).forEach(([key, value]) => {
        if (value?.trim()) {
          const categoryId = parseInt(key.replace('custom_', ''));
          const otherKey = `other_${categoryId}`;
          if (!formData.selectedGames[otherKey]) {
            games.push({ gameName: value.trim(), categoryId });
          }
        }
      });

      const dto: WaitListDTO = {
        email: formData.email,
        games,
      };

      const success = await submitWaitList(dto);
      if (success) {
        onClose();
        setFormData({ email: '', selectedGames: {}, customGames: {} });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="text-purple-400" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white">Unite a la lista de espera</h2>
              <p className="text-gray-400 text-sm">Te avisaremos cuando esté listo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Categorías competitivas de interés</h3>
            <p className="text-gray-400 text-sm mb-4">Selecciona las categorías en las que te gustaría participar (opcional)</p>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                <p className="text-gray-400 mt-2">Cargando categorías...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 flex items-center justify-between text-left transition-colors"
                    >
                      <span className="font-medium text-white">{category.name}</span>
                      {expandedCategories[category.id] ? (
                        <ChevronUp className="text-gray-400" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </button>

                    {expandedCategories[category.id] && (
                      <div className="p-4 bg-gray-850 border-t border-gray-700">
                        <div className="grid grid-cols-2 gap-3">
                          {category.games.map((game) => (
                            <label key={game.id} className="flex items-center space-x-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.selectedGames[`game_${game.id}`] || false}
                                onChange={() => handleGameToggle(`game_${game.id}`)}
                                className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                              />
                              <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                                {game.name}
                              </span>
                            </label>
                          ))}
                          
                          <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.selectedGames[`other_${category.id}`] || false}
                              onChange={() => handleGameToggle(`other_${category.id}`)}
                              className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                            />
                            <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                              Otros
                            </span>
                          </label>
                        </div>

                        {(formData.selectedGames[`other_${category.id}`] || formData.customGames[`custom_${category.id}`]) && (
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder={`Escribe otro juego de ${category.name.toLowerCase()}...`}
                              value={formData.customGames[`custom_${category.id}`] || ''}
                              onChange={(e) => handleCustomGameChange(category.id, e.target.value)}
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting || !formData.email}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uniéndote...
              </>
            ) : (
              'Unirme a la lista'
            )}
          </button>

          <p className="text-gray-400 text-xs text-center mt-4">
            No spam, solo te avisaremos cuando la plataforma esté lista.
          </p>
        </form>
      </div>
    </div>
  );
};