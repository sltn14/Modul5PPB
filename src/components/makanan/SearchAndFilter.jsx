// src/components/makanan/SearchAndFilter.jsx
import { Search } from 'lucide-react';

export default function SearchAndFilter({ searchQuery, setSearchQuery }) {
  return (
    <section className="mb-8 md:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
        Jelajahi Resep Makanan
      </h1>
      <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
        Temukan inspirasi masakan Nusantara favoritmu. Dari hidangan utama hingga camilan, semua ada di sini.
      </p>
      <div className="relative max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Cari nama makanan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 md:py-4 bg-white/80 backdrop-blur-sm border border-slate-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}