// src/pages/RecipeDetailPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  Clock,
  Star as StarIcon,
  Loader,
  Heart,
  Share2
} from 'lucide-react';

import userService from '../services/userService';
import { formatDate } from '../utils/helpers';

import { useRecipe } from '../hooks/useRecipes';
import { useReviews, useCreateReview } from '../hooks/useReviews';
import { useIsFavorited } from '../hooks/useFavorites';

export default function RecipeDetailPage({ recipeId, onBack, onEdit }) {
  const {
    recipe,
    loading: recipeLoading,
    error: recipeError,
  } = useRecipe(recipeId);

  const {
    reviews,
    loading: reviewsLoading,
    refetch: refetchReviews,
  } = useReviews(recipeId);

  const {
    createReview,
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = useCreateReview();

  const {
    isFavorited,
    loading: favLoading,
    toggleFavorite,
  } = useIsFavorited(recipeId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shareState, setShareState] = useState('idle'); // idle, sharing, done, error
  const [copied, setCopied] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const userProfile = userService.getUserProfile?.() || { username: 'Guest' };

  // build canonical share URL
  const shareUrl = (() => {
    try {
      const origin = window?.location?.origin || '';
      if (recipeId) return `${origin}/recipe/${recipeId}`;
      return window.location.href;
    } catch {
      return window.location.href;
    }
  })();

  useEffect(() => {
    if (createSuccess) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createSuccess) {
      const t = setTimeout(() => {
        refetchReviews();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [createSuccess, refetchReviews]);

  const handleSubmitReview = useCallback(
    async (e) => {
      e.preventDefault();
      if (submitting) return;
      if (!comment.trim()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setSubmitting(true);

      const payload = {
        user_identifier: userProfile.username,
        rating,
        comment: comment.trim(),
      };

      try {
        const res = await createReview(recipeId, payload);
        if (res && res.success) {
          setComment('');
          setRating(5);
        } else {
          alert('Gagal mengirim ulasan. Silakan coba lagi.');
        }
      } catch (err) {
        alert('Terjadi kesalahan ketika mengirim ulasan.');
      } finally {
        setSubmitting(false);
      }
    },
    [comment, createReview, rating, recipeId, submitting, userProfile.username]
  );

  const handleToggleFavorite = useCallback(async () => {
    try {
      await toggleFavorite();
    } catch (err) {
      console.error('Toggle favorite failed', err);
    }
  }, [toggleFavorite]);

  // share logic: Web Share API -> Clipboard -> show input fallback
  const handleShare = async () => {
    try {
      setShareState('sharing');
      setCopied(false);

      if (navigator.share) {
        await navigator.share({
          title: `${recipe?.name || 'Resep'} - Resep Nusantara`,
          text: `Cobain ${recipe?.name || 'resep ini'} di Resep Nusantara!`,
          url: shareUrl,
        });
        setShareState('done');
        setTimeout(() => setShareState('idle'), 1200);
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setShareState('done');
        setTimeout(() => {
          setCopied(false);
          setShareState('idle');
        }, 1400);
        return;
      }

      // fallback to visible input
      setShowUrlInput(true);
      setShareState('idle');
    } catch (err) {
      console.error('Share failed', err);
      setShareState('error');
      setTimeout(() => setShareState('idle'), 1200);
    }
  };

  const handleManualCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } else {
        const el = document.getElementById('recipe-share-url-input');
        if (el) {
          el.select();
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }
      }
    } catch (err) {
      console.warn('manual copy failed', err);
    }
  };

  if (recipeLoading) return <LoaderFullScreen message="Memuat resep..." />;
  if (recipeError) return <ErrorScreen message={String(recipeError)} onBack={onBack} />;
  if (!recipe) return <NotFoundScreen onBack={onBack} />;

  const Stars = ({ value }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={`w-4 h-4 ${s <= Math.round(value) ? 'text-amber-500 fill-current' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} aria-label="Kembali" className="p-2 rounded-md hover:bg-slate-100 transition">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">{recipe.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <Stars value={recipe.average_rating || 0} />
              <span className="ml-1 font-medium text-slate-700">
                {recipe.average_rating ? recipe.average_rating.toFixed(1) : '-'}
              </span>
              <span className="text-xs text-slate-400">({recipe.review_count || 0})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className="p-2 rounded-md hover:bg-slate-100 transition"
                aria-label="Favorite"
                disabled={favLoading}
                title={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-slate-400'}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-md hover:bg-slate-100 transition flex items-center gap-2"
                aria-label="Share Link"
                title="Bagikan link resep"
              >
                <Share2
                  className={`w-5 h-5 ${shareState === 'done' ? 'text-green-500' : 'text-slate-700'}`}
                />
                <span className="hidden md:inline-block text-xs text-slate-600">
                  {copied ? 'Tersalin' : 'Bagikan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 md:h-96">
            <img
              src={recipe.image_url || recipe.image || '/images/placeholder.png'}
              alt={recipe.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-105 transition"
                aria-label="Share Link"
              >
                <Share2 className={`w-5 h-5 ${shareState === 'done' ? 'text-green-600' : 'text-slate-700'}`} />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-slate-500">Resep</p>
                <h2 className="text-2xl font-bold">{recipe.name}</h2>
              </div>
              <div className="text-sm text-slate-600">
                <Clock className="inline-block w-4 h-4 mr-1" /> {(recipe.prep_time || '-') } menit
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Bahan</h3>
                <ul className="list-disc list-inside text-slate-700">
                  {(recipe.ingredients || []).map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Langkah</h3>
                <ol className="list-decimal list-inside text-slate-700 space-y-2">
                  {(recipe.steps || []).map((it, i) => <li key={i}>{it}</li>)}
                </ol>
              </div>
            </div>

            {showUrlInput && (
              <div className="mt-6 flex gap-2 items-center">
                <input id="recipe-share-url-input" readOnly value={shareUrl} className="flex-1 px-3 py-2 border rounded-md" />
                <button onClick={handleManualCopy} className="px-3 py-2 bg-blue-600 text-white rounded-md">
                  {copied ? 'Tersalin' : 'Salin'}
                </button>
                <button onClick={() => setShowUrlInput(false)} className="px-3 py-2 bg-slate-200 rounded-md">
                  Tutup
                </button>
              </div>
            )}

            {/* Reviews and review form kept minimal */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Ulasan ({(reviews || []).length})</h4>
              <div className="space-y-3">
                {(reviews || []).map((r) => (
                  <div key={r.id} className="p-3 bg-slate-50 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                          {r.user?.slice?.(0,1)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-medium">{r.user}</div>
                          <div className="text-xs text-slate-500">{new Date(r.createdAt).toLocaleDateString('id-ID')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Stars value={r.rating} />
                      </div>
                    </div>
                    <p className="mt-2 text-slate-700">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="mt-6 bg-white border p-4 rounded-md">
              <div className="mb-2">Rating:
                {[1,2,3,4,5].map((v) => (
                  <button key={v} type="button" onClick={() => setRating(v)} className="ml-2">
                    <StarIcon className={`w-5 h-5 ${rating >= v ? 'text-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
              <textarea value={comment} onChange={(e)=>setComment(e.target.value)} className="w-full p-2 border rounded-md mb-3" rows={3} placeholder="Tulis ulasan..." />
              <div className="flex justify-end gap-2">
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>
    </div>
  );
}

// helper components
function Stars({ value }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((i) => (
        <StarIcon key={i} className={`w-4 h-4 ${i <= Math.round(value) ? 'text-amber-500 fill-current' : 'text-slate-300'}`} />
      ))}
    </div>
  );
}

function LoaderFullScreen({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="text-center">
        <Loader className="w-12 h-12 animate-spin text-slate-600 mx-auto mb-4" />
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-6 text-center border">
        <p className="text-red-600 font-semibold mb-2">Terjadi Kesalahan</p>
        <p className="text-sm text-slate-600 mb-4">{message}</p>
        <button onClick={onBack} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition">Kembali</button>
      </div>
    </div>
  );
}

function NotFoundScreen({ onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="text-center">
        <p className="text-slate-600 mb-4">Resep tidak ditemukan</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
