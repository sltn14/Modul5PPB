// src/pages/HomePage.jsx
import { TrendingUp, Clock, Users, Star, ChefHat, Coffee, Play, ArrowRight } from 'lucide-react';
import { ResepMakanan } from '../data/makanan';
import { ResepMinuman } from '../data/minuman';
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const featuredMakanan = Object.values(ResepMakanan.resep).slice(0, 3);
  const featuredMinuman = Object.values(ResepMinuman.resep).slice(0, 2);

  // Animation states
  const [visibleMakanan, setVisibleMakanan] = useState(new Set());
  const [visibleMinuman, setVisibleMinuman] = useState(new Set());
  const makananRefs = useRef([]);
  const minumanRefs = useRef([]);

  // Intersection Observer for animations
  useEffect(() => {
    const observerMakanan = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleMakanan(prev => new Set(prev).add(index));
          }, index * 200); // Staggered animation
        }
      });
    }, { threshold: 0.1 });

    const observerMinuman = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleMinuman(prev => new Set(prev).add(index));
          }, index * 250); // Staggered animation
        }
      });
    }, { threshold: 0.1 });

    // Observe makanan cards
    makananRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observerMakanan.observe(ref);
      }
    });

    // Observe minuman cards
    minumanRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observerMinuman.observe(ref);
      }
    });

    return () => {
      observerMakanan.disconnect();
      observerMinuman.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden min-h-screen md:min-h-[85vh] flex items-center">
        {/* Enhanced Background floating elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-12 w-32 h-32 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-8 w-24 h-24 bg-gradient-to-r from-cyan-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-1/4 left-16 w-20 h-20 bg-gradient-to-r from-indigo-200/25 to-blue-200/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-300/15 to-purple-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />

        {/* Mobile Hero - Optimized */}
        <div className="md:hidden relative z-10 w-full px-4 py-8 text-center">
          {/* Main Title with Consistent Styling */}
          <div className="mb-4">
            <h2 className="text-2xl font-medium text-slate-800 mb-2">
              Selamat datang di
            </h2>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 transform -skew-y-1 rounded-lg opacity-80"></div>
              <h1 className="relative text-2xl font-bold text-slate-800 px-4 py-2">
                Resep Nusantara
              </h1>
            </div>
            <p className="text-slate-600 text-base mb-4 mt-4">Warisan Kuliner Indonesia</p>
            <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
              Temukan ribuan resep autentik dari seluruh Nusantara. Dari masakan tradisional hingga kreasi modern.
            </p>
          </div>

          {/* Mobile Images - Optimized Layout */}
          <div className="mb-8 max-w-xs mx-auto">
            <div className="space-y-3">
              {/* Top Image - Mobile Rectangle */}
              <div className="relative group">
                <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                  <div className="w-full h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Featured Recipe"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Images - Mobile Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105">
                    <div className="w-full h-20 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=150&fit=crop&crop=center"
                        alt="Featured Recipe 2"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                    <div className="w-full h-20 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=150&fit=crop&crop=center"
                        alt="Featured Drink"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 max-w-xs mx-auto">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm">
              <ChefHat className="w-4 h-4" />
              <span>Jelajahi Resep</span>
            </button>
            <button className="bg-white/25 backdrop-blur-xl border border-white/40 text-slate-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm">
              <Play className="w-4 h-4" />
              <span>Video Tutorial</span>
            </button>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content - Enhanced Size */}
            <div className="text-center lg:text-left">
              <div className="mb-10">
                <h2 className="text-5xl lg:text-6xl font-medium text-slate-800 mb-4">
                  Selamat datang di
                </h2>
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 transform -skew-y-1 rounded-xl opacity-80"></div>
                  <h1 className="relative text-5xl lg:text-6xl font-semibold text-slate-800 px-6 py-3 whitespace-nowrap">
                    Resep Nusantara
                  </h1>
                </div>
                <p className="text-2xl text-slate-600 mb-8">Warisan Kuliner Indonesia</p>
                <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                  Temukan ribuan resep autentik dari seluruh Nusantara. Dari masakan tradisional hingga kreasi modern yang menggugah selera.
                </p>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-5 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-lg">
                  <ChefHat className="w-6 h-6" />
                  <span>Jelajahi Resep</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/25 backdrop-blur-xl border border-white/40 text-slate-700 px-10 py-5 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 text-lg">
                  <Play className="w-6 h-6" />
                  <span>Video Tutorial</span>
                </button>
              </div>
            </div>

            {/* Right Content - Much Larger Image Grid */}
            <div className="relative max-w-2xl mx-auto lg:max-w-2xl">
              {/* Grid Container */}
              <div className="space-y-6">
                {/* Top Image - Large Rectangle */}
                <div className="relative group">
                  <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                    <div className="w-full h-80 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Featured Recipe"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Images - 2 Large Half Rectangles */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Bottom Left - Large Half Rectangle */}
                  <div className="relative group">
                    <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-105">
                      <div className="w-full h-40 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&crop=center"
                          alt="Featured Recipe 2"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Right - Large Half Rectangle */}
                  <div className="relative group">
                    <div className="bg-white/15 backdrop-blur-2xl border border-white/25 rounded-3xl overflow-hidden shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                      <div className="w-full h-40 overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=250&fit=crop&crop=center"
                          alt="Featured Drink"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">

        {/* Featured Makanan - Mobile Optimized Cards */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-slate-800">Resep Makanan</h2>
            <button className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {featuredMakanan.map((recipe, index) => (
              <div 
                key={recipe.id} 
                ref={el => makananRefs.current[index] = el}
                className={`group transform transition-all duration-700 ${
                  visibleMakanan.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Mobile Optimized Glass Recipe Card */}
                <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20">
                  
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Recipe Image - Smaller for mobile */}
                  <div className="relative h-32 md:h-56 overflow-hidden">
                    <img 
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Text Content - Compact for mobile */}
                  <div className="relative z-10 p-4 md:p-8">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                        Makanan
                      </span>
                      <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                        <span className="text-xs md:text-sm font-semibold text-slate-700">4.8</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {recipe.name}
                    </h3>
                    
                    <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                      <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                        <Clock className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-medium">{recipe.ingredients.length} bahan</span>
                      </div>
                      <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                        <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="font-medium">{recipe.steps.length} langkah</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Minuman - Mobile Optimized Cards */}
        <section>
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold text-slate-800">Resep Minuman</h2>
            <button className="text-slate-500 hover:text-slate-600 font-medium text-xs md:text-sm transition-colors duration-200 hover:underline">
              Lihat Semua
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {featuredMinuman.map((recipe, index) => (
              <div 
                key={recipe.id}
                ref={el => minumanRefs.current[index] = el}
                className={`group transform transition-all duration-700 ${
                  visibleMinuman.has(index) 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
              >
                {/* Mobile Optimized Glass Recipe Card - Horizontal Layout */}
                <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/15 transition-all duration-500 cursor-pointer group-hover:scale-105 group-hover:bg-white/20">
                  
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex">
                    {/* Recipe Image - Full height untuk mobile dan desktop */}
                    <div className="h-29 w-28 md:h-48 md:w-48 flex-shrink-0 overflow-hidden">
                      <img 
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Text Content - Compact for mobile */}
                    <div className="relative z-10 p-4 md:p-8 flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <span className="text-xs font-semibold text-indigo-700 bg-indigo-100/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                          Minuman
                        </span>
                        <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs md:text-sm font-semibold text-slate-700">4.7</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-slate-800 mb-2 md:mb-4 text-sm md:text-xl group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                        {recipe.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                        <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-medium">{recipe.ingredients.length} bahan</span>
                        </div>
                        <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                          <Coffee className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-medium">{recipe.steps.length} langkah</span>
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