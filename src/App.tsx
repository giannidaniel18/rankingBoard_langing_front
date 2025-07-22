import React, { useState } from 'react';
import { Trophy, Users, Target, Crown } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { WaitListModal } from './components/WaitListModal';
import { FeatureCard } from './components/FeatureCard';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 overflow-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          {/* Hero section */}
          <div className="text-center mb-16 max-w-4xl">
            {/* Trophy icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 transform hover:scale-110 transition-transform duration-300">
              <Trophy size={48} className="text-white" />
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
              Jugar está bien. Pero ganar es más divertido 🔥
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Trackeá partidas, sumá puntos y coroná campeones en cualquier tipo de juego.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Unite a la lista de espera
            </button>
          </div>

          {/* Features section */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
            <FeatureCard
              icon={Users}
              title="Creá grupos"
              description="Invitá a tus amigos y formá equipos para competir"
              iconColor="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={Target}
              title="Registrá partidas"
              description="Llevá el control de cada juego y resultado"
              iconColor="bg-gradient-to-br from-green-500 to-green-600"
            />
            <FeatureCard
              icon={Crown}
              title="Coroná campeones"
              description="Rankings automáticos y trofeos para los ganadores"
              iconColor="bg-gradient-to-br from-yellow-500 to-orange-500"
            />
          </div>

          {/* Bottom text */}
          <div className="text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Perfecta para grupos de amigos
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Torneos profesionales
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Fácil de usar
              </span>
            </p>
          </div>
        </main>
      </div>

      {/* Modal */}
      <WaitListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;