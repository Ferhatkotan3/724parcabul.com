

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser, cart, getCartItemsCount, isDarkMode, toggleTheme, searchQuery, setSearchQuery, updateQuantity, removeFromCart, getCartTotal } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/');
    } catch (error) {
      toast.error('Çıkış yapılırken hata oluştu');
    }
  };

  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-car-line text-white text-lg"></i>
            </div>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Pacifico, serif' }}>
              724ParcaBul
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Parça kodu veya ürün adı ara..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className={`ri-search-line text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i className="ri-arrow-right-line text-sm text-blue-600 hover:text-blue-700"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <i className={`${isDarkMode ? 'ri-sun-line' : 'ri-moon-line'} text-lg`}></i>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <i className="ri-shopping-cart-line text-lg"></i>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <i className="ri-user-line text-lg"></i>
                  <span className="hidden sm:block text-sm">{user.full_name || user.email}</span>
                  <i className="ri-arrow-down-s-line text-sm"></i>
                </button>

                {isUserMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                    <div className="py-1">
                      <Link
                        to="/account"
                        className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-user-line mr-2"></i>
                        Hesabım
                      </Link>
                      <Link
                        to="/orders"
                        className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <i className="ri-file-list-line mr-2"></i>
                        Siparişlerim
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="ri-admin-line mr-2"></i>
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <i className="ri-logout-box-line mr-2"></i>
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Giriş
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Üye Ol
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-4`}>
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Parça kodu veya ürün adı ara..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className={`ri-search-line text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                </div>
              </div>
            </form>
            
            <div className="space-y-2">
              <Link
                to="/categories"
                className={`block px-3 py-2 rounded-lg text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Kategoriler
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-lg text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-lg text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsCartOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sepetim ({cart.length} ürün)
                  </h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                  >
                    <i className="ri-close-line text-lg"></i>
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <i className={`ri-shopping-cart-line text-4xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`}></i>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sepetiniz boş</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}>
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-12 h-12 object-cover object-top rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                            {item.name}
                          </h4>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.part_code}
                          </p>
                          <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            ₺{item.price.toLocaleString('tr-TR')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`p-1 rounded ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                          >
                            <i className="ri-subtract-line text-sm"></i>
                          </button>
                          <span className={`w-6 text-center text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className={`p-1 rounded ${
                              item.quantity >= item.stock
                                ? 'text-gray-400 cursor-not-allowed'
                                : isDarkMode 
                                  ? 'text-gray-400 hover:text-white hover:bg-gray-600' 
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            <i className="ri-add-line text-sm"></i>
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.success('Ürün sepetten kaldırıldı');
                          }}
                          className={`p-1 rounded ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-600' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className={`px-4 py-3 sm:px-6 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Toplam:
                    </span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      ₺{getCartTotal().toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
                        isDarkMode 
                          ? 'text-gray-300 border border-gray-600 hover:bg-gray-700' 
                          : 'text-gray-700 border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      Alışverişe Devam
                    </button>
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 text-center"
                    >
                      Sepete Git
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

