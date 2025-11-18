// src/pages/MakananPage.jsx
import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import AdvancedFilter from '../components/common/AdvancedFilter';

export default function MakananPage({ onRecipeClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    sortBy: 'created_at',
    order: 'desc',
    prepTimeMax: '',
  });
  const [page, setPage] = useState(1);
  const [copiedId, setCopiedId] = useState(null);

  const { recipes, loading, error, pagination, refetch } = useRecipes({
    category: 'makanan',
    search: searchQuery || undefined,
    difficulty: filters.difficulty || undefined,
    page,
    limit: 12,
    sort_by: filters.sortBy,
    order: filters.order
  });

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const filteredRecipes = filters.prepTimeMax
    ? recipes.filter(recipe => recipe.prep_time <= parseInt(filters.prepTimeMax))
    : recipes;

  const handleShare = async (r) => {
    const url = `${window.location.origin}/recipe/${r.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: r.name, text: `Cek resep ${r.name}`, url });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedId(r.id);
        setTimeout(() => setCopiedId(null), 1400);
      } else {
        // fallback
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopiedId(r.id);
        setTimeout(() => setCopiedId(null), 1400);
      }
    } catch (err) {
      console.error('share error', err);
      alert('Gagal membagikan tautan');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">Resep Makanan</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Temukan berbagai resep makanan nusantara yang lezat</p>
        </div>

        <AdvancedFilter
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          initialFilters={{ ...filters, search: searchQuery }}
        />

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat resep...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 font-semibold mb-2">Terjadi Kesalahan</p>
              <p className="text-red-500">{error}</p>
              <button onClick={refetch} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Coba Lagi</button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Tidak ada resep ditemukan</p>
                <p className="text-gray-500 mt-2">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((r) => (
                  <article key={r.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                    <div className="relative h-44 rounded-lg overflow-hidden mb-3">
                      <img src={r.image_url || r.image || '/images/placeholder.png'} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{r.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{r.description || ''}</p>

                    <div className="mt-auto flex items-center gap-2">
                      <button
                        onClick={() => onRecipeClick(r.id, 'makanan')}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Detail
                      </button>

                      <button
                        onClick={() => handleShare(r)}
                        className="px-3 py-2 bg-white border rounded-md hover:bg-slate-50"
                        aria-label={`Bagikan ${r.name}`}
                      >
                        {copiedId === r.id ? 'Tersalin' : 'Share'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {pagination && pagination.total_pages > 1 && (
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-6 py-3 bg-white/80 backdrop-blur border border-slate-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700">← Sebelumnya</button>

                <div className="flex flex-col md:flex-row items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-xl border border-white/40">
                  <span className="text-slate-700 font-semibold">Halaman {pagination.page} dari {pagination.total_pages}</span>
                  <span className="text-slate-500 text-sm">({pagination.total} resep)</span>
                </div>

                <button onClick={() => setPage(p => p + 1)} disabled={page === pagination.total_pages} className="px-6 py-3 bg-white/80 backdrop-blur border border-slate-300 rounded-xl hover:bg-blue-50 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-slate-700">Selanjutnya →</button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
