import React from "react";
import { GamesData, WaitListFormData } from "../types/waitList";

// Define explicit type for category keys
export type CategoryKey = "esports" | "boardGames" | "sports";

interface CategorySelectorProps {
  games?: GamesData;
  formData: WaitListFormData;
  openSections: Record<CategoryKey, boolean>;
  toggleSection: (section: CategoryKey) => void;
  handleCategoryChange: (category: CategoryKey, option: string, checked: boolean) => void;
  handleOtherTextChange: (category: CategoryKey, value: string) => void;
  validationErrors: Record<string, string>;
  serviceLoading: boolean;
  isSubmitting: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  games,
  formData,
  openSections,
  toggleSection,
  handleCategoryChange,
  handleOtherTextChange,
  validationErrors,
  serviceLoading,
  isSubmitting,
}) => {
  if (!games) return null;
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white">Categorías competitivas de interés</label>
        <p className="text-xs text-gray-400 mt-1">
          Selecciona las categorías en las que te gustaría participar (opcional)
        </p>
      </div>
      {validationErrors.selectedCategories && (
        <p className="text-sm text-red-400 flex items-center gap-1">{validationErrors.selectedCategories}</p>
      )}
      {Object.entries(games).map(([key, category]) => {
        const typedKey = key as CategoryKey;
        return (
          <div key={typedKey} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection(typedKey)}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 flex items-center justify-between text-left transition-colors"
            >
              <span className="font-medium text-white flex items-center gap-2">
                {category.title}
                {formData.selectedCategories[typedKey].length > 0 && (
                  <span className="bg-purple-400/10 text-purple-400 px-2 py-1 rounded-full text-xs">
                    {formData.selectedCategories[typedKey].length}
                  </span>
                )}
              </span>
              <span className="text-gray-400">{openSections[typedKey] ? "▲" : "▼"}</span>
            </button>
            {openSections[typedKey] && (
              <div className="p-4 bg-gray-850 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  {category.options.map((option: { id: number; name: string }) => (
                    <label key={option.id} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.selectedCategories[typedKey].includes(option.name)}
                        onChange={(e) => handleCategoryChange(typedKey, option.name, e.target.checked)}
                        disabled={isSubmitting}
                        className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                        {option.name}
                      </span>
                    </label>
                  ))}
                </div>
                {/* Campo "Otros" */}
                {formData.selectedCategories[typedKey].includes("Otros") && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <label htmlFor={`${typedKey}-other`} className="text-sm font-medium text-white">
                      Especifica otros {category.title.toLowerCase()}:
                    </label>
                    <input
                      id={`${typedKey}-other`}
                      placeholder={`Otros ${category.title.toLowerCase()}...`}
                      value={formData.otherTexts[typedKey]}
                      onChange={(e) => handleOtherTextChange(typedKey, e.target.value)}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mt-1"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {serviceLoading && (
        <div className="flex items-center justify-center py-4">
          <svg className="animate-spin h-5 w-5 text-purple-500 mr-2" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm text-gray-400">Cargando categorías...</span>
        </div>
      )}
    </div>
  );
};
