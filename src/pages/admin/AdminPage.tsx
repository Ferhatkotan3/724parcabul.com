
import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const { user, isDarkMode } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Siparişleri yükle
    const loadOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders);
    };

    loadOrders();
  }, [user, navigate]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    );
    
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast.success('Sipariş durumu güncellendi');
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      preparing: { label: 'Hazırlanıyor', color: 'bg-yellow-100 text-yellow-800', icon: 'ri-time-line' },
      shipped: { label: 'Kargoda', color: 'bg-blue-100 text-blue-800', icon: 'ri-truck-line' },
      delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800', icon: 'ri-check-line' },
      cancelled: { label: 'İptal Edildi', color: 'bg-red-100 text-red-800', icon: 'ri-close-line' },
      returned: { label: 'İade Edildi', color: 'bg-gray-100 text-gray-800', icon: 'ri-arrow-go-back-line' }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.preparing;
  };

  const getOrderStats = () => {
    const total = orders.length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    return { total, preparing, shipped, delivered, totalRevenue };
  };

  const stats = getOrderStats();

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Paneli
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sipariş yönetimi ve sistem kontrolü
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <i className="ri-file-list-line text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Toplam Sipariş
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <i className="ri-time-line text-yellow-600"></i>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Hazırlanıyor
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.preparing}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <i className="ri-truck-line text-blue-600"></i>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Kargoda
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.shipped}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <i className="ri-check-line text-green-600"></i>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Teslim Edildi
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.delivered}
                </p>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <i className="ri-money-dollar-circle-line text-green-600"></i>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Toplam Gelir
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stats.totalRevenue.toFixed(2)}₺
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sipariş Listesi */}
        <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="p-6 border-b border-gray-200">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sipariş Yönetimi
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Sipariş No
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Müşteri
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Tutar
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Durum
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Tarih
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {orders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={order.id} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.trackingNumber}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {order.total.toFixed(2)}₺
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <i className={`${statusInfo.icon} mr-1`}></i>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                          
                          {/* Durum Değiştirme Butonları */}
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'shipped')}
                              className="text-blue-600 hover:text-blue-900 cursor-pointer whitespace-nowrap"
                              title="Kargoya Ver"
                            >
                              <i className="ri-truck-line"></i>
                            </button>
                          )}
                          
                          {order.status === 'shipped' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'delivered')}
                              className="text-green-600 hover:text-green-900 cursor-pointer whitespace-nowrap"
                              title="Teslim Edildi"
                            >
                              <i className="ri-check-line"></i>
                            </button>
                          )}
                          
                          {(order.status === 'preparing' || order.status === 'shipped') && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="text-red-600 hover:text-red-900 cursor-pointer whitespace-nowrap"
                              title="İptal Et"
                            >
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                          
                          {order.status === 'delivered' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'returned')}
                              className="text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
                              title="İade Et"
                            >
                              <i className="ri-arrow-go-back-line"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <i className={`ri-file-list-line text-4xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}></i>
              <p className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                Henüz sipariş yok
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                Siparişler geldiğinde burada görünecek
              </p>
            </div>
          )}
        </div>

        {/* Sipariş Detay Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sipariş Detayı - {selectedOrder.trackingNumber}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                  >
                    <i className={`ri-close-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
                  </button>
                </div>

                {/* Sipariş Bilgileri */}
                <div className="space-y-6">
                  <div>
                    <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Ürünler
                    </h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any) => (
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
                  </div>

                  <div>
                    <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Teslimat Adresi
                    </h4>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <p className="font-medium">
                        {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                      </p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>
                        {selectedOrder.shippingAddress.district}, {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
                      </p>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Sipariş Notu
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Toplam Tutar
                    </span>
                    <span className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedOrder.total.toFixed(2)}₺
                    </span>
                  </div>
                </div>

                {/* Durum Değiştirme */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className={`font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sipariş Durumu Değiştir
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrder.status !== 'shipped' && selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-truck-line mr-1"></i>
                        Kargoya Ver
                      </button>
                    )}
                    
                    {selectedOrder.status === 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-check-line mr-1"></i>
                        Teslim Edildi
                      </button>
                    )}
                    
                    {(selectedOrder.status === 'preparing' || selectedOrder.status === 'shipped') && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-close-line mr-1"></i>
                        İptal Et
                      </button>
                    )}
                    
                    {selectedOrder.status === 'delivered' && (
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'returned')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap text-sm"
                      >
                        <i className="ri-arrow-go-back-line mr-1"></i>
                        İade Et
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
