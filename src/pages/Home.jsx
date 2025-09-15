// src/pages/Home.jsx
import React, { useState } from 'react';

function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  // Data dummy untuk resep
  const popularRecipes = [
    {
      id: 1,
      name: "Rendang Daging",
      image: "🥩",
      time: "3 jam",
      difficulty: "Sulit",
      likes: 1200,
      category: "Masakan Padang",
      rating: 4.9
    },
    {
      id: 2,
      name: "Gudeg Yogya",
      image: "🍛",
      time: "2 jam",
      difficulty: "Sedang",
      likes: 850,
      category: "Masakan Jawa",
      rating: 4.7
    },
    {
      id: 3,
      name: "Sate Ayam",
      image: "🍢",
      time: "45 menit",
      difficulty: "Mudah",
      likes: 950,
      category: "Masakan Nusantara",
      rating: 4.8
    },
    {
      id: 4,
      name: "Gado-Gado",
      image: "🥗",
      time: "30 menit",
      difficulty: "Mudah",
      likes: 720,
      category: "Makanan Sehat",
      rating: 4.6
    }
  ];

  const categories = [
    { name: "Masakan Padang", icon: "🌶️", count: 45, color: "from-red-400 to-red-600" },
    { name: "Masakan Jawa", icon: "🍜", count: 38, color: "from-green-400 to-green-600" },
    { name: "Makanan Laut", icon: "🐟", count: 29, color: "from-blue-400 to-blue-600" },
    { name: "Minuman", icon: "🧋", count: 22, color: "from-purple-400 to-purple-600" },
    { name: "Dessert", icon: "🍰", count: 18, color: "from-pink-400 to-pink-600" },
    { name: "Snack", icon: "🍪", count: 31, color: "from-yellow-400 to-yellow-600" }
  ];

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Mudah': return 'text-green-600 bg-green-100';
      case 'Sedang': return 'text-yellow-600 bg-yellow-100';
      case 'Sulit': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Render halaman berdasarkan currentPage
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'search':
        return <SearchPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  // Komponen HomePage
  const HomePage = () => (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.5 1.5c-1.1 0-2.1.4-2.8 1.2-.6-.3-1.3-.4-2-.2-1.1.3-1.9 1.3-1.9 2.5 0 .2 0 .4.1.6-1.1.6-1.9 1.8-1.9 3.1V20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.7c0-1.3-.8-2.5-1.9-3.1.1-.2.1-.4.1-.6 0-1.2-.8-2.2-1.9-2.5-.7-.2-1.4-.1-2 .2-.7-.8-1.7-1.2-2.8-1.2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Resep Nusantara</h1>
              <p className="text-orange-100 text-sm">Cita rasa Indonesia</p>
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="relative">
          <svg className="w-full h-6 text-gray-50 fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="-mt-6 relative z-10 px-4 space-y-8">
        {/* Search Bar */}
        <section>
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
              onClick={() => handleNavigation('search')}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-lg border-0 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-300"
            />
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Kategori Resep</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-xs font-semibold mb-1">
                  {category.name}
                </div>
                <div className="text-xs opacity-90">
                  {category.count} resep
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Recipes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Resep Populer</h2>
            <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {popularRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center text-2xl">
                    {recipe.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{recipe.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{recipe.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {recipe.time}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
                          {recipe.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center text-xs text-yellow-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                          {recipe.rating}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <svg className="w-4 h-4 mr-1 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {recipe.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-orange-50 text-orange-700 py-3 px-4 rounded-xl hover:bg-orange-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Buat Resep</span>
              </button>
              <button 
                onClick={() => handleNavigation('favorites')}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-700 py-3 px-4 rounded-xl hover:bg-red-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">Favorit</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                💡
              </div>
              <h3 className="text-lg font-bold">Tips Hari Ini</h3>
            </div>
            <p className="text-orange-100 text-sm leading-relaxed">
              Untuk mendapatkan rendang yang sempurna, tumis bumbu halus hingga harum dan berminyak sebelum memasukkan daging. Masak dengan api kecil dan sabar menunggu hingga santan mengering.
            </p>
          </div>
        </section>
      </main>
    </div>
  );

  // Komponen halaman lainnya
  const SearchPage = () => (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => handleNavigation('home')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <h1 className="text-xl font-bold">Pencarian</h1>
        <div></div>
      </div>
      <p className="text-gray-600">Fitur pencarian akan segera hadir!</p>
    </div>
  );

  const FavoritesPage = () => (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => handleNavigation('home')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <h1 className="text-xl font-bold">Resep Favorit</h1>
        <div></div>
      </div>
      <p className="text-gray-600">Simpan resep favorit Anda di sini!</p>
    </div>
  );

  const ProfilePage = () => (
    <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => handleNavigation('home')}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
        <h1 className="text-xl font-bold">Profil</h1>
        <div></div>
      </div>
      <p className="text-gray-600">Kelola profil dan pengaturan Anda!</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPage={currentPage} onNavigate={handleNavigation} />
    </div>
  );
}

// Bottom Navigation Component
const BottomNavigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: 'home' },
    { id: 'search', label: 'Cari', icon: 'search' },
    { id: 'favorites', label: 'Favorit', icon: 'heart' },
    { id: 'profile', label: 'Profil', icon: 'user' }
  ];

  const getIcon = (iconType, isActive) => {
    const baseClasses = "w-6 h-6 mb-1";
    const iconColor = isActive ? "text-orange-500" : "text-gray-400";
    
    switch (iconType) {
      case 'home':
        return (
          <svg className={`${baseClasses} ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        );
      case 'search':
        return (
          <svg className={`${baseClasses} ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={`${baseClasses} ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'user':
        return (
          <svg className={`${baseClasses} ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-3 transition-colors ${
              currentPage === item.id ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {getIcon(item.icon, currentPage === item.id)}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Home;