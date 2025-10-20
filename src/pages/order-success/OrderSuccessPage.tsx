
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { isDarkMode } = useStore();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: any) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <h1 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sipariş bulunamadı
          </h1>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 cursor-pointer whitespace-nowrap"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 p-8 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Siparişiniz Alındı!
          </h1>
          
          <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Siparişiniz başarıyla oluşturuldu ve işleme alındı.
          </p>

          <div className={`inline-flex items-center px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <i className="ri-truck-line mr-2 text-blue-600"></i>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sipariş No: {order.trackingNumber}
            </span>
          </div>
        </div>

        {/* Sipariş Detayları */}
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sipariş Detayları
          </h2>
          
          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.quantity} adet
                    </p>
                  </div>
                </div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(item.price * item.quantity).toFixed(2)}₺
                </p>
              </div>
            ))}
          </div>

          <div className={`border-t mt-4 pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between font-semibold text-lg">
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>Toplam</span>
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                {order.total.toFixed(2)}₺
              </span>
            </div>
          </div>
        </div>

        {/* Teslimat Bilgileri */}
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-6`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Teslimat Adresi
          </h2>
          
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.district}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>

        {/* Sipariş Durumu */}
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-8`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Sipariş Durumu
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full">
              <i className="ri-time-line text-sm"></i>
            </div>
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hazırlanıyor
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Siparişiniz hazırlanmaya başlandı
              </p>
            </div>
          </div>
        </div>

        {/* Aksiyonlar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={`/orders/${order.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-eye-line mr-2"></i>
            Siparişi Takip Et
          </Link>
          <Link
            to="/"
            className={`flex-1 text-center py-3 rounded-lg border cursor-pointer whitespace-nowrap font-medium ${
              isDarkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <i className="ri-home-line mr-2"></i>
            Alışverişe Devam Et
          </Link>
        </div>

        {/* Bilgilendirme */}
        <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
          <div className="flex items-start space-x-3">
            <i className="ri-information-line text-blue-600 mt-0.5"></i>
            <div className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
              <p className="font-medium mb-1">Önemli Bilgiler:</p>
              <ul className="space-y-1 text-xs">
                <li>• Siparişinizin durumunu "Siparişlerim" sayfasından takip edebilirsiniz</li>
                <li>• Kargo takip numaranız e-posta adresinize gönderilecektir</li>
                <li>• Teslimat süresi 1-3 iş günüdür</li>
                <li>• Sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
