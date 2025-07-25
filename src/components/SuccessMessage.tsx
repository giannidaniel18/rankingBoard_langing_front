import React from "react";
import { CheckCircle } from "lucide-react";

export const SuccessMessage: React.FC = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">¡Genial!</h3>
    <p className="text-gray-400">
      Te agregamos a la lista de espera. Te avisaremos cuando esté listo para que puedas organizar tus primeros torneos.
    </p>
  </div>
);
