import { useState } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      name: 'Makanan Utama', 
      icon: '🍛', 
      gradient: 'from-red-400 to-red-600',
      count: '120+ resep'
    },
    { 
      name: 'Makanan Ringan', 
      icon: '🍪', 
      gradient: 'from-teal-400 to-teal-600',
      count: '85+ resep'
    },
    { 
      name: 'Minuman', 
      icon: '🥤', 
      gradient: 'from-blue-400 to-blue-600',
      count: '45+ resep'
    },
    { 
      name: 'Dessert', 
      icon: '🍰', 
      gradient: 'from-green-400 to-green-600',
      count: '60+ resep'
    },
  ];

  const featuredRecipes = [
    {
      id: 1,
      name: 'Rendang Padang',
      image: '🥘',
      time: '2 jam',
      difficulty: 'Sulit',
      region: 'Sumatera Barat',
      rating: 4.9,
      likes: 1284
    },
    {
      id: 2,
      name: 'Gado-gado Jakarta',
      image: '🥗',
      time: '30 menit',
      difficulty: 'Mudah',
      region: 'DKI Jakarta',
      rating: 4.7,
      likes: 892
    },
    {
      id: 3,
      name: 'Soto Ayam',
      image: '🍲',
      time: '1 jam',
      difficulty: 'Sedang',
      region: 'Jawa Tengah',
      rating: 4.8,
      likes: 756
    },
    {
      id: 4,
      name: 'Gudeg Yogya',
      image: '🍛',
      time: '3 jam',
      difficulty: 'Sulit',
      region: 'DI Yogyakarta',
      rating: 4.6,
      likes: 643
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Mudah': return 'text-green-600 bg-green-100';
      case 'Sedang': return 'text-yellow-600 bg-yellow-100';
      case 'Sulit': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="px-4 py-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="/favicon.svg" 
              alt="Logo" 
              className="w-12 h-12 drop-shadow-lg" 
            />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-300">
              Resep Nusantara
            </h1>
          </div>
          <p className="text-lg opacity-90 font-light">
            Jelajahi Cita Rasa Indonesia
          </p>
        </div>
        
        {/* Decorative wave */}
        <div className="relative">
          <svg 
            className="w-full h-6 text-gray-50 fill-current" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </header>

      <div className="px-4 -mt-6 relative z-10">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari resep favorit Anda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Kategori Resep
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`
                  bg-gradient-to-br ${category.gradient} 
                  rounded-2xl p-6 text-white text-center 
                  card-hover cursor-pointer group
                `}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">
                  {category.name}
                </h3>
                <p className="text-sm opacity-90">
                  {category.count}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Resep Populer
            </h2>
            <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer"
              >
                {/* Recipe Image */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-32 flex items-center justify-center">
                  <span className="text-6xl">{recipe.image}</span>
                </div>
                
                {/* Recipe Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-800">
                      {recipe.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">{recipe.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {recipe.time}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {recipe.region}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {recipe.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Aksi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-primary-50 text-primary-700 py-3 px-4 rounded-xl hover:bg-primary-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Buat Resep</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-secondary-50 text-secondary-700 py-3 px-4 rounded-xl hover:bg-secondary-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">Favorit</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;