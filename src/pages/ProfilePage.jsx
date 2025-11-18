import { useState, useEffect } from 'react';
import { Heart, Camera, Edit2, Save, X, Loader } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import userService from '../services/userService';
import FavoriteButton from '../components/common/FavoriteButton';

export default function ProfilePage({ onRecipeClick }) {
  const [user, setUser] = useState({
    username: 'Pengguna',
    avatar: null,
    bio: ''
  });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(user.username);
  const [activeTab, setActiveTab] = useState('semua');

  const { favorites, loading: favoritesLoading, error: favoritesError, refetch } = useFavorites();

  useEffect(() => {
    const profile = userService.getUserProfile();
    setUser(profile);
    setTempUsername(profile.username);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const result = userService.updateAvatar(base64String);
      if (result.success) {
        setUser(prev => ({ ...prev, avatar: base64String }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUsername = () => {
    const result = userService.updateUsername(tempUsername);
    if (result.success) {
      setUser(result.data);
      setIsEditingUsername(false);
    }
  };

  const handleCancelEdit = () => {
    setTempUsername(user.username);
    setIsEditingUsername(false);
  };

  const handleFavoriteToggle = () => {
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const filteredFavorites = favorites.filter(recipe => {
    if (activeTab === 'semua') return true;
    return recipe.category === activeTab;
  });

  return (
    <div className="p-6 md:p-10 pb-24 md:pb-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Profil Pengguna
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">

            {/* Avatar */}
            <div className="relative mx-auto md:mx-0 group">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden shadow-lg">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-5xl">👤</span>
                )}
              </div>

              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-blue-700 text-white p-3 rounded-full cursor-pointer hover:bg-blue-800 transition shadow-md"
              >
                <Camera size={20} />
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                {isEditingUsername ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="text-2xl font-bold text-gray-800 border-2 border-blue-600 rounded-lg px-3 py-1 focus:outline-none shadow-sm"
                      autoFocus
                    />
                    <button onClick={handleSaveUsername} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                      <Save size={20} />
                    </button>
                    <button onClick={handleCancelEdit} className="bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300 transition">
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{user.username}</h3>
                    <button onClick={() => setIsEditingUsername(true)} className="text-gray-400 hover:text-blue-600 transition">
                      <Edit2 size={22} />
                    </button>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6 text-sm md:text-base italic">
                {user.bio || ' Makanan indo enak nyam nyam '}
              </p>

              {/* Hapus makanan & minuman count – sisakan total favorit */}
              <div className="flex justify-center md:justify-start gap-10">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-gray-900">{favorites.length}</p>
                  <p className="text-gray-600 text-sm">Total Favorit</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 md:gap-5 mb-8 border-b overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('semua')}
            className={`px-5 md:px-7 py-3 rounded-t-lg transition ${
              activeTab === 'semua'
                ? 'text-blue-700 font-semibold border-b-2 border-blue-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Semua ({favorites.length})
          </button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Resep yang Saya Sukai</h3>
          </div>
          <p className="text-gray-600 text-sm md:text-base">My Resep Fvoritku</p>
        </div>

        {/* Loading */}
        {favoritesLoading && favorites.length === 0 && (
          <div className="text-center py-16">
            <Loader className="w-14 h-14 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Memuat favorit...</p>
          </div>
        )}

        {/* Error */}
        {favoritesError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <p className="text-red-700 font-bold mb-2">Terjadi Kesalahan</p>
            <p className="text-red-600 mb-4">{favoritesError}</p>
            <button onClick={refetch} className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Coba Lagi
            </button>
          </div>
        )}

        {/* Grid */}
        {!favoritesLoading && !favoritesError && (
          <>
            {filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                {filteredFavorites.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 group cursor-pointer"
                    onClick={() => onRecipeClick && onRecipeClick(recipe.id, recipe.category)}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />

                      <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
                        <FavoriteButton recipeId={recipe.id} size="sm" onToggle={handleFavoriteToggle} />
                      </div>

                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-md ${
                          recipe.category === 'makanan' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                        }`}
                      >
                        {recipe.category === 'makanan' ? 'Makanan' : 'Minuman'}
                      </span>
                    </div>

                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{recipe.name}</h4>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-800 font-medium text-sm md:text-base">
                            {recipe.average_rating ? recipe.average_rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                        <div className="text-gray-600 text-xs md:text-sm">
                          {recipe.prep_time} menit
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Heart className="text-gray-300 mx-auto mb-4" size={50} />
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  Belum Ada Resep Favorit
                </h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Mulai tambahkan resep favorit Anda dengan menekan ikon hati pada resep
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
