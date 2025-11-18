// src/main.jsx
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import ProfilePage from './pages/ProfilePage';
import CreateRecipePage from './pages/CreateRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import RecipeDetail from './components/recipe/RecipeDetail';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css';
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);

  // navigation state
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'makanan' | 'minuman' | 'profile'
  const [mode, setMode] = useState('list'); // 'list' | 'detail' | 'create' | 'edit'
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('makanan'); // default category
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  // splash complete
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // navigation helpers
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMode('list');
    setSelectedRecipeId(null);
    setEditingRecipeId(null);
  };

  const handleCreateRecipe = () => {
    setMode('create');
  };

  const handleRecipeClick = (recipeId, category) => {
    setSelectedRecipeId(recipeId);
    setSelectedCategory(category || currentPage || 'makanan');
    setMode('detail');

    // update browser URL (so deep link can be copied)
    try {
      const url = `${window.location.origin}/recipe/${recipeId}${category ? `?recipeType=${category}` : ''}`;
      window.history.pushState({}, '', url);
    } catch (e) {
      // ignore if unavailable
      // console.warn('pushState failed', e);
    }
  };

  const handleEditRecipe = (recipeId) => {
    console.log('🔧 Edit button clicked! Recipe ID:', recipeId);
    setEditingRecipeId(recipeId);
    setMode('edit');
    console.log('✅ Mode changed to: edit');
  };

  const handleBack = () => {
    // if we were in detail and browser history has a previous state, go back
    // but keep fallback to internal state
    if (mode === 'detail') {
      // try history back if path looks like /recipe/:id
      const path = window.location.pathname || '';
      if (path.startsWith('/recipe/')) {
        try {
          window.history.back();
        } catch (e) {
          // fallback to internal navigation
          setMode('list');
          setSelectedRecipeId(null);
          setEditingRecipeId(null);
        }
      } else {
        setMode('list');
        setSelectedRecipeId(null);
        setEditingRecipeId(null);
      }
    } else {
      setMode('list');
      setSelectedRecipeId(null);
      setEditingRecipeId(null);
    }
  };

  const handleCreateSuccess = (newRecipe) => {
    alert('Resep berhasil dibuat!');
    setMode('list');
    // optionally navigate to the newly created recipe's category
    if (newRecipe && newRecipe.category) {
      setCurrentPage(newRecipe.category);
    }
  };

  const handleEditSuccess = (updatedRecipe) => {
    alert('Resep berhasil diperbarui!');
    setMode('list');
  };

  // When the app first loads, check if URL is /recipe/:id (deep link).
  // If so, set internal state to show detail for that id.
  useEffect(() => {
    try {
      const path = window.location.pathname || '';
      const search = window.location.search || '';
      // support both /recipe/123 and /recipe/123/ (trim)
      if (path.startsWith('/recipe/')) {
        const parts = path.split('/').filter(Boolean); // ['recipe', '123']
        const id = parts.length >= 2 ? parts[1] : null;
        if (id) {
          const params = new URLSearchParams(search);
          const recipeType = params.get('recipeType') || params.get('type') || null;
          setSelectedRecipeId(id);
          if (recipeType) setSelectedCategory(recipeType);
          setMode('detail');
          // optionally set currentPage to category if provided
          if (recipeType) setCurrentPage(recipeType);
        }
      } else {
        // also check for legacy query param ?recipeId=1
        const params = new URLSearchParams(window.location.search || '');
        const qid = params.get('recipeId') || params.get('id') || null;
        const qtype = params.get('recipeType') || params.get('type') || null;
        if (qid) {
          setSelectedRecipeId(qid);
          if (qtype) setSelectedCategory(qtype);
          setMode('detail');
          if (qtype) setCurrentPage(qtype);
        }
      }
    } catch (err) {
      // ignore parsing errors
      // console.warn('deep link parse error', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const renderCurrentPage = () => {
    // Create
    if (mode === 'create') {
      return <CreateRecipePage onBack={handleBack} onSuccess={handleCreateSuccess} />;
    }

    // Edit
    if (mode === 'edit') {
      return (
        <EditRecipePage recipeId={editingRecipeId} onBack={handleBack} onSuccess={handleEditSuccess} />
      );
    }

    // Detail
    if (mode === 'detail') {
      return (
        <RecipeDetail
          recipeId={selectedRecipeId}
          category={selectedCategory}
          onBack={handleBack}
          onEdit={handleEditRecipe}
        />
      );
    }

    // List pages (home/makanan/minuman/profile)
    switch (currentPage) {
      case 'home':
        return <HomePage onRecipeClick={handleRecipeClick} onNavigate={handleNavigation} />;
      case 'makanan':
        return <MakananPage onRecipeClick={handleRecipeClick} />;
      case 'minuman':
        return <MinumanPage onRecipeClick={handleRecipeClick} />;
      case 'profile':
        return <ProfilePage onRecipeClick={handleRecipeClick} />;
      default:
        return <HomePage onRecipeClick={handleRecipeClick} onNavigate={handleNavigation} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show desktop navbar when in list mode */}
      {mode === 'list' && (
        <>
          <DesktopNavbar
            currentPage={currentPage}
            onNavigate={handleNavigation}
            onCreateRecipe={handleCreateRecipe}
          />
          <MobileNavbar
            currentPage={currentPage}
            onNavigate={handleNavigation}
            onCreateRecipe={handleCreateRecipe}
          />
        </>
      )}

      {/* Main Content */}
      <main className="min-h-screen">{renderCurrentPage()}</main>

      {/* Always render mobile navbar at bottom for convenience */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
);
