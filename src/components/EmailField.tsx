import React from "react";

interface EmailFieldProps {
  value: string;
  onChange: (email: string) => void;
  error?: string;
  disabled?: boolean;
}

export const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, error, disabled }) => (
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium text-white">
      Email *
    </label>
    <input
      id="email"
      type="email"
      placeholder="tu@email.com"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-12"
      autoFocus
    />
    {error && <p className="text-sm text-red-400 flex items-center gap-1">{error}</p>}
  </div>
);
