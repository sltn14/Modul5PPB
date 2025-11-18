// src/components/common/FavoriteButton.jsx

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useIsFavorited } from '../../hooks/useFavorites';

/**
 * FavoriteButton Component - Simple API Integration
 */
export default function FavoriteButton({ recipeId, onToggle, size = 'md' }) {
  const { isFavorited, loading, toggleFavorite } = useIsFavorited(recipeId);
  const [isAnimating, setIsAnimating] = useState(false);

  // Size variants
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (loading) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    console.log('❤️ Toggle favorite:', recipeId);
    await toggleFavorite();

    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizes[size]} rounded-full flex items-center justify-center
        transition-all duration-200
        ${isFavorited
          ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'
          : 'bg-white/95 hover:bg-gray-50 text-slate-700 hover:text-red-500 shadow-gray-200'}
        shadow-md hover:shadow-xl
        backdrop-blur-sm border border-white/40
        ${isAnimating ? 'scale-125' : 'scale-100'}
        ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
      `}
      title={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
    >
      {loading ? (
        <div className={`${iconSizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin`} />
      ) : (
        <Heart
          className={`
            ${iconSizes[size]}
            transition-all duration-200 drop-shadow-sm
            ${isFavorited ? 'fill-current scale-110' : 'scale-100'}
            ${isAnimating ? 'animate-pulse' : ''}
          `}
        />
      )}
    </button>
  );
}