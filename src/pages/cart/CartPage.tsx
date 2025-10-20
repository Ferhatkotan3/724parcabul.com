

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { isDarkMode, cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast.success('Ürün sepetten kaldırıldı');
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Sepetiniz boş');
      return;
    }
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast.success('Siparişiniz başarıyla oluşturuldu!');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6">
              <i className={`ri-shopping-cart-line text-6xl ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
            </div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Sepetiniz Boş
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
              Alışverişe başlamak için ürünleri keşfedin
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Alışverişe Başla
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>
          Sepetim ({cart.length} ürün)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover object-top rounded-lg"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Parça Kodu: {item.part_code}
                  </p>
                  <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mt-1`}>
                    ₺{item.price.toLocaleString('tr-TR')}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className={`p-1 rounded ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className={`w-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className={`p-1 rounded ${
                      item.quantity >= item.stock
                        ? 'text-gray-400 cursor-not-allowed'
                        : isDarkMode 
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-8`}>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Sipariş Özeti
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Ara Toplam:</span>
                  <span>₺{getCartTotal().toLocaleString('tr-TR')}</span>
                </div>
                <div className={`flex justify-between ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Kargo:</span>
                  <span>{getCartTotal() >= 500 ? 'Ücretsiz' : '₺25'}</span>
                </div>
                <div className={`flex justify-between text-lg font-semibold pt-3 border-t ${isDarkMode ? 'text-white border-gray-600' : 'text-gray-900 border-gray-200'}`}>
                  <span>Toplam:</span>
                  <span>₺{(getCartTotal() + (getCartTotal() >= 500 ? 0 : 25)).toLocaleString('tr-TR')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isCheckingOut
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isCheckingOut ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <i className="ri-secure-payment-line mr-2"></i>
                    Siparişi Onayla (Test Modu)
                  </>
                )}
              </button>

              <div className={`mt-4 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                <i className="ri-shield-check-line mr-1"></i>
                Güvenli ödeme sistemi
              </div>

          {/* Checkout Button */}
          <div className="mt-8">
            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap font-medium text-center block"
            >
              Siparişi Tamamla ({total.toFixed(2)}₺)
            </Link>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

