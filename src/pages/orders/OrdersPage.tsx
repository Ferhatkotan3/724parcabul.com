
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const { orderId } = useParams();
  const { user, isDarkMode } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      setIsLoading(true);
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Kullanıcının siparişlerini filtrele
      const userOrders = user 
        ? storedOrders.filter((order: any) => order.userId === user.id)
        : storedOrders;
      
      setOrders(userOrders);
      
      // Eğer URL'de orderId varsa, o siparişi seç
      if (orderId) {
        const order = userOrders.find((o: any) => o.id === orderId);
        setSelectedOrder(order);
      }
      
      setIsLoading(false);
    };

    loadOrders();
  }, [user, orderId]);

  const getStatusInfo = (status: string) => {
    const statusMap = {
      preparing: { 
        label: 'Hazırlanıyor', 
        color: 'bg-yellow-100 text-yellow-800', 
        icon: 'ri-time-line',
        description: 'Siparişiniz hazırlanmaya başlandı'
      },
      shipped: { 
        label: 'Kargoda', 
        color: 'bg-blue-100 text-blue-800', 
        icon: 'ri-truck-line',
        description: 'Siparişiniz kargoya verildi'
      },
      delivered: { 
        label: 'Teslim Edildi', 
        color: 'bg-green-100 text-green-800', 
        icon: 'ri-check-line',
        description: 'Siparişiniz başarıyla teslim edildi'
      },
      cancelled: { 
        label: 'İptal Edildi', 
        color: 'bg-red-100 text-red-800', 
        icon: 'ri-close-line',
        description: 'Sipariş iptal edildi'
      },
      returned: { 
        label: 'İade Edildi', 
        color: 'bg-gray-100 text-gray-800', 
        icon: 'ri-arrow-go-back-line',
        description: 'Sipariş iade edildi'
      }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.preparing;
  };

  const requestReturn = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, returnRequested: true, returnRequestDate: new Date().toISOString() }
        : order
    );
    
    setOrders(updatedOrders);
    
    // localStorage'ı güncelle
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedAllOrders = allOrders.map((order: any) => 
      order.id === orderId 
        ? { ...order, returnRequested: true, returnRequestDate: new Date().toISOString() }
        : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedAllOrders));
    
    toast.success('İade talebi gönderildi. En kısa sürede değerlendirilecektir.');
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Tek sipariş detayı görünümü
  if (selectedOrder) {
    const statusInfo = getStatusInfo(selectedOrder.status);
    
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/orders"
              className={`inline-flex items-center text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} cursor-pointer whitespace-nowrap`}
            >
              <i className="ri-arrow-left-line mr-1"></i>
              Siparişlerime Dön
            </Link>
          </div>

          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6 mb-6`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Sipariş Detayı
                </h1>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sipariş No: {selectedOrder.trackingNumber}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  <i className={`${statusInfo.icon} mr-1`}></i>
                  {statusInfo.label}
                </span>
              </div>
            </div>

            {/* Sipariş Durumu Timeline */}
            <div className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sipariş Durumu
              </h2>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  ['preparing', 'shipped', 'delivered'].includes(selectedOrder.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  <i className="ri-time-line"></i>
                </div>
                <div className={`flex-1 h-1 ${
                  ['shipped', 'delivered'].includes(selectedOrder.status) 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  ['shipped', 'delivered'].includes(selectedOrder.status) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  <i className="ri-truck-line"></i>
                </div>
                <div className={`flex-1 h-1 ${
                  selectedOrder.status === 'delivered' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  selectedOrder.status === 'delivered' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  <i className="ri-check-line"></i>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Hazırlanıyor</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Kargoda</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Teslim Edildi</span>
              </div>
              <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {statusInfo.description}
              </p>
            </div>

            {/* Ürünler */}
            <div className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Sipariş Edilen Ürünler
              </h2>
              <div className="space-y-4">
                {selectedOrder.items.map((item: any) => (
                  <div key={item.id} className={`flex items-center space-x-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.name}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Adet: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(item.price * item.quantity).toFixed(2)}₺
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.price.toFixed(2)}₺ / adet
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teslimat Bilgileri */}
            <div className="mb-8">
              <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Teslimat Bilgileri
              </h2>
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedOrder.shippingAddress.address}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Toplam Tutar
                </span>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedOrder.total.toFixed(2)}₺
                </span>
              </div>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Sipariş Tarihi: {new Date(selectedOrder.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* İade Butonu */}
            {selectedOrder.status === 'delivered' && !selectedOrder.returnRequested && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => requestReturn(selectedOrder.id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-arrow-go-back-line mr-2"></i>
                  İade Talebi Oluştur
                </button>
              </div>
            )}

            {selectedOrder.returnRequested && (
              <div className={`mt-6 pt-6 border-t p-4 rounded-lg ${isDarkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'} border`}>
                <div className="flex items-center space-x-2">
                  <i className="ri-information-line text-yellow-600"></i>
                  <span className={`font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    İade Talebi Gönderildi
                  </span>
                </div>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                  İade talebiniz {new Date(selectedOrder.returnRequestDate).toLocaleDateString('tr-TR')} tarihinde gönderildi. 
                  En kısa sürede değerlendirilecektir.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Sipariş listesi görünümü
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Siparişlerim
        </h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Sipariş No: {order.trackingNumber}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(order.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        <i className={`${statusInfo.icon} mr-1`}></i>
                        {statusInfo.label}
                      </span>
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.total.toFixed(2)}₺
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    {order.items.slice(0, 3).map((item: any, index: number) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {order.items.length} ürün • {statusInfo.description}
                    </p>
                    <div className="mt-2 sm:mt-0 flex space-x-2">
                      <Link
                        to={`/orders/${order.id}`}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-1"></i>
                        Detayları Gör
                      </Link>
                      {order.status === 'delivered' && !order.returnRequested && (
                        <button
                          onClick={() => requestReturn(order.id)}
                          className="px-4 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-arrow-go-back-line mr-1"></i>
                          İade Et
                        </button>
                      )}
                    </div>
                  </div>

                  {order.returnRequested && (
                    <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                      <div className="flex items-center space-x-2">
                        <i className="ri-information-line text-yellow-600 text-sm"></i>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                          İade talebi gönderildi
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm`}>
            <i className={`ri-shopping-bag-line text-4xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Henüz siparişiniz yok
            </h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              İlk siparişinizi vermek için alışverişe başlayın
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
            >
              Alışverişe Başla
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
