// src/pages/HomePage.jsx
import { Search, TrendingUp, Clock, Users, Star, ChefHat, Coffee } from 'lucide-react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';

export default function HomePage() {
  const featuredMakanan = Object.values(ResepMakanan.resep).slice(0, 3);
  
  const featuredMinuman = Object.values(ResepMinuman.resep).slice(0, 2);

  const categories = [
    { 
      name: "Masakan Utama", 
      count: Object.keys(ResepMakanan.resep).length, 
      icon: ChefHat, 
      gradient: "from-blue-400 to-blue-600" 
    },
    { 
      name: "Minuman", 
      count: Object.keys(ResepMinuman.resep).length, 
      icon: Coffee, 
      gradient: "from-indigo-400 to-indigo-600" 
    },
    { 
      name: "Dessert", 
      count: 8, 
      icon: Star, 
      gradient: "from-purple-400 to-purple-600" 
    },
    { 
      name: "Snack", 
      count: 12, 
      icon: TrendingUp, 
      gradient: "from-cyan-400 to-cyan-600" 
    }
  ];

  const stats = [
    { label: "Total Resep", value: `${Object.keys(ResepMakanan.resep).length + Object.keys(ResepMinuman.resep).length}+`, icon: ChefHat },
    { label: "Pengguna Aktif", value: "15K+", icon: Users },
    { label: "Rating Rata-rata", value: "4.8", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-12 w-24 h-24 bg-indigo-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-8 w-16 h-16 bg-blue-100/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }} />

        {/* Mobile Header */}
        <header className="md:hidden relative z-10 px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src="/LOGORN.png" 
                alt="Resep Nusantara Logo"
                className="w-14 h-14 object-contain filter drop-shadow-lg"
              />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                Resep Nusantara
              </h1>
              <p className="text-slate-600 text-sm">Warisan Kuliner Indonesia</p>
            </div>
          </div>

          {/* Search Bar Mobile */}
          <div className="relative max-w-sm mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="text"
              placeholder="Cari resep favorit..."
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 placeholder-slate-500"
            />
          </div>
        </header>

        {/* Desktop Hero */}
        <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/LOGORN.png" 
                alt="Resep Nusantara Logo"
                className="w-16 h-16 object-contain filter drop-shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                  Resep Nusantara
                </h1>
                <p className="text-xl text-slate-600">Warisan Kuliner Indonesia</p>
              </div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full mb-8" />
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl">
                    <IconComponent className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Kategori Populer</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="group">
                  <div className={`bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-center mb-1">{category.name}</h3>
                    <p className="text-sm text-slate-500 text-center">{category.count} resep</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Featured Makanan */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Resep Makanan Pilihan</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMakanan.map((recipe) => (
              <div key={recipe.id} className="group">
                <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                  
                  {/* Recipe Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        Makanan
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-slate-600">4.8</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {recipe.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.ingredients.length} bahan</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ChefHat className="w-4 h-4" />
                        <span>{recipe.steps.length} langkah</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Minuman */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Resep Minuman Populer</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMinuman.map((recipe) => (
              <div key={recipe.id} className="group">
                <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-105">
                  
                  <div className="md:flex">
                    {/* Recipe Image */}
                    <div className="h-48 md:h-32 md:w-32 md:flex-shrink-0 overflow-hidden">
                      <img 
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6 md:flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                          Minuman
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-slate-600">4.7</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                        {recipe.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.ingredients.length} bahan</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Coffee className="w-4 h-4" />
                          <span>{recipe.steps.length} langkah</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}