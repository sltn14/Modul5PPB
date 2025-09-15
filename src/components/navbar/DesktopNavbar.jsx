// src/components/DesktopNavbar.jsx
export default function DesktopNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Beranda' },
    { id: 'makanan', label: 'Makanan' },
    { id: 'minuman', label: 'Minuman' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="hidden md:block shadow-lg border-b border-blue-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img
                src="/LOGORN.png"
                alt="Resep Nusantara Logo"
                className="w-12 h-12 object-contain filter drop-shadow-md transform transition-transform duration-300 group-hover:scale-110"
              />
              {/* Decorative particles */}
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60" />
              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '300ms' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                Resep
              </h1>
              <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent -mt-1">
                Nusantara
              </h2>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-3 text-base font-medium transition-all duration-200 border-b-2 ${
                  currentPage === item.id
                    ? 'text-blue-600 border-blue-500'
                    : 'text-slate-600 border-transparent hover:text-blue-500 hover:border-blue-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari resep..."
                className="w-72 pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200 placeholder-slate-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}