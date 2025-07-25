import React, { useState, useEffect } from "react";
import { X, Mail, AlertCircle } from "lucide-react";
import { WaitListDTO, WaitListFormData, GamesData } from "../types/waitList";
import { transformFormDataToDTO } from "../utils/waitListForm";
import { waitListSchema } from "../validation/waitList";
import { CategorySelector } from "./CategorySelector";
import { EmailField } from "./EmailField";
import { SuccessMessage } from "./SuccessMessage";

interface WaitListModalProps {
  isOpen: boolean;
  onClose: () => void;
  games: GamesData | undefined;
  isLoading: boolean;
  createEntry: (data: WaitListDTO) => Promise<string>;
  fetchGames: () => Promise<void>;
  error?: string | null;
}

const initialFormData: WaitListFormData = {
  email: "",
  selectedCategories: {
    esports: [],
    boardGames: [],
    sports: [],
  },
  otherTexts: {
    esports: "",
    boardGames: "",
    sports: "",
  },
};

export const WaitListModal: React.FC<WaitListModalProps> = ({
  isOpen,
  onClose,
  games,
  isLoading: serviceLoading,
  createEntry,
  error,
}) => {
  const [formData, setFormData] = useState<WaitListFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState({
    esports: false,
    boardGames: false,
    sports: false,
  });

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSubmitting]);

  const handleCategoryChange = (
    category: keyof typeof formData.selectedCategories,
    option: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      selectedCategories: {
        ...prev.selectedCategories,
        [category]: checked
          ? [...prev.selectedCategories[category], option]
          : prev.selectedCategories[category].filter((item) => item !== option),
      },
    }));
    if (checked && validationErrors.selectedCategories) {
      setValidationErrors((prev) => ({ ...prev, selectedCategories: "" }));
    }
  };

  const handleOtherTextChange = (category: keyof typeof formData.otherTexts, value: string) => {
    setFormData((prev) => ({
      ...prev,
      otherTexts: {
        ...prev.otherTexts,
        [category]: value,
      },
    }));
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      waitListSchema.parse({ email: formData.email });
      setIsSubmitting(true);
      const dto = transformFormDataToDTO(formData, games);
      await createEntry(dto);
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "errors" in error) {
        const errors: Record<string, string> = {};
        (error as { errors: Array<{ path: (string | number)[]; message: string }> }).errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        setValidationErrors({ general: "Error al unirse a la lista de espera. Por favor, intenta nuevamente." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData(initialFormData);
      setValidationErrors({});
      setIsSubmitted(false);
      setOpenSections({ esports: false, boardGames: false, sports: false });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-400/10 rounded-full">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Unite a la lista de espera</h2>
              <p className="text-gray-400 text-sm">Te avisaremos cuando esté listo</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-full text-gray-400 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Content */}
        <div className="p-6">
          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="bg-red-600 text-white p-4 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
          {isSubmitted ? (
            <SuccessMessage />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <EmailField
                value={formData.email}
                onChange={(email) => {
                  setFormData((prev) => ({ ...prev, email }));
                  if (validationErrors.email) {
                    setValidationErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                error={validationErrors.email}
                disabled={isSubmitting}
              />
              <CategorySelector
                games={games}
                formData={formData}
                openSections={openSections}
                toggleSection={toggleSection}
                handleCategoryChange={handleCategoryChange}
                handleOtherTextChange={handleOtherTextChange}
                validationErrors={validationErrors}
                serviceLoading={serviceLoading}
                isSubmitting={isSubmitting}
              />
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.email || serviceLoading}
                  className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Unirme a la lista"
                  )}
                </button>
              </div>
              {validationErrors.general && (
                <p className="text-sm text-red-400 flex items-center gap-1 mt-2">
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.general}
                </p>
              )}
              <p className="text-xs text-gray-400 text-center mt-4">
                No spam, solo te avisaremos cuando la plataforma esté lista.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
