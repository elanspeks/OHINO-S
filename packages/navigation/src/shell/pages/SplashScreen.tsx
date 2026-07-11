import React, { useEffect } from 'react';
import { useRouter } from '../../router';

export const SplashScreen: React.FC = () => {
  const { navigate } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="text-center">
        <div className="text-6xl mb-4">🧠</div>
        <h1 className="text-5xl font-bold text-white mb-2">OHINO-S</h1>
        <p className="text-2xl text-blue-100">Understanding Beyond Words</p>
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
};
