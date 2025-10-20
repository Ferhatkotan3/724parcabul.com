

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/product/ProductCard';
import SearchBar from '../../components/common/SearchBar';
import { mockProducts } from '../../mocks/products';
import { mockCategories } from '../../mocks/categories';

interface Product {
  id: string;
  part_code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useStore();
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use mock data
      setCategories(mockCategories.slice(0, 8));
      
      // Best sellers - products with higher prices (premium products)
      const bestSellersData = mockProducts
        .filter(product => product.price > 200)
        .slice(0, 8);
      setBestSellers(bestSellersData);
      
      // New products - sorted by created_at (newest first)
      const newProductsData = mockProducts
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8);
      setNewProducts(newProductsData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Hidden Content for Better Indexing */}
      <div className="sr-only">
        <h1>724ParcaBul - Türkiye'nin En Büyük Yedek Parça Satış Sitesi</h1>
        <p>Otomotiv yedek parçaları, motor parçaları, fren balata, amortisör, lastik ve binlerce ürün çeşidi. Hızlı teslimat, uygun fiyat, güvenli alışveriş. Türkiye'nin 1 numaralı yedek parça platformu.</p>
        <ul>
          <li>Motor yedek parçaları - piston, segman, supap</li>
          <li>Fren sistemi parçaları - balata, disk, kaliper</li>
          <li>Süspansiyon parçaları - amortisör, yay, rotil</li>
          <li>Elektrik parçaları - alternatör, marş motoru</li>
          <li>Lastik ve jant çeşitleri</li>
          <li>Motor yağları ve sıvılar</li>
          <li>Filtreler - hava, yağ, yakıt filtresi</li>
          <li>Egzoz sistemi parçaları</li>
        </ul>
      </div>

      {/* Hero Section with SEO Optimized Content */}
      <section 
        className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=modern%20automotive%20parts%20warehouse%20with%20organized%20shelves%20full%20of%20car%20parts%2C%20professional%20lighting%2C%20clean%20industrial%20environment%2C%20high-tech%20inventory%20system%2C%20premium%20quality%20auto%20parts%20display%2C%20Turkish%20automotive%20industry%2C%20professional%20workshop%20atmosphere&width=1920&height=800&seq=hero-seo-bg&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Türkiye'nin <span className="text-yellow-400">#1</span> Yedek Parça Sitesi
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-100">
              724ParcaBul - 7/24 Yedek Parça Bulun
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              <strong>Binlerce yedek parça çeşidi</strong> • Hızlı teslimat • Uygun fiyat • Güvenli alışveriş
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
                ✓ 50.000+ Ürün Çeşidi
              </span>
              <span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
                ✓ Aynı Gün Kargo
              </span>
              <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
                ✓ 2 Yıl Garanti
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/categories')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-search-line mr-2"></i>
                Yedek Parça Ara
              </button>
              <button 
                onClick={() => navigate('/categories')}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-car-line mr-2"></i>
                Kategorileri Gör
              </button>
            </div>
          </div>
        </div>
        
        {/* SEO Keywords Floating Elements */}
        <div className="absolute top-10 left-10 opacity-10 text-6xl">
          <i className="ri-car-line"></i>
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 text-6xl">
          <i className="ri-tools-line"></i>
        </div>
      </section>

      {/* SEO Rich Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popüler Yedek Parça Kategorileri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aracınız için ihtiyaç duyduğunuz tüm yedek parçaları kategoriler halinde düzenledik. 
              Kaliteli, orijinal ve muadil parçalar uygun fiyatlarla.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.slice(0, 12).map((category) => (
              <div 
                key={category.id}
                onClick={() => navigate('/categories')}
                className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:bg-blue-600 transition-colors">
                  <i className={`ri-${category.id === 1 ? 'car' : category.id === 2 ? 'tools' : category.id === 3 ? 'oil-can' : category.id === 4 ? 'flashlight' : category.id === 5 ? 'tire' : 'settings'}-line`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {category.productCount} ürün
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Optimized Best Sellers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              En Çok Satan Yedek Parçalar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Müşterilerimizin en çok tercih ettiği, kaliteli ve güvenilir yedek parçalar. 
              Hızlı teslimat ve 2 yıl garanti ile.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <div key={product.id} data-product-shop>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Features Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Neden 724ParcaBul?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Türkiye'nin en güvenilir yedek parça platformu olarak size en iyi hizmeti sunuyoruz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                <i className="ri-truck-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Hızlı Teslimat</h3>
              <p className="text-blue-100">Aynı gün kargo, 1-2 gün teslimat garantisi</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                <i className="ri-shield-check-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">2 Yıl Garanti</h3>
              <p className="text-blue-100">Tüm ürünlerde 2 yıl garanti, güvenli alışveriş</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                <i className="ri-price-tag-3-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">En Uygun Fiyat</h3>
              <p className="text-blue-100">Piyasanın en uygun fiyatları, özel indirimler</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-500 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                <i className="ri-customer-service-2-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">7/24 Destek</h3>
              <p className="text-blue-100">Uzman ekibimiz 7/24 hizmetinizde</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO New Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Yeni Eklenen Yedek Parçalar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En son eklenen kaliteli yedek parçalar. Yenilikçi teknoloji ve üstün kalite bir arada.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <div key={product.id} data-product-shop>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Brands Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Güvenilir Markalar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dünya çapında tanınmış markaların orijinal ve muadil yedek parçaları
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {['Bosch', 'Valeo', 'Continental', 'Mahle', 'Febi', 'Lemförder', 'Sachs', 'NGK'].map((brand, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-12 flex items-center justify-center">
                  <span className="font-bold text-gray-700">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Yedek parça alışverişi hakkında merak ettikleriniz
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Yedek parça siparişim ne kadar sürede gelir?
              </h3>
              <p className="text-gray-700">
                Stokta bulunan ürünler aynı gün kargoya verilir. Teslimat süresi 1-2 iş günüdür. 
                Özel sipariş ürünlerde teslimat süresi 3-5 iş günü olabilir.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Yedek parçalar orijinal mi muadil mi?
              </h3>
              <p className="text-gray-700">
                Hem orijinal hem de muadil yedek parçalar satışımız mevcuttur. 
                Ürün sayfalarında açıkça belirtilmiştir. Tüm muadil parçalarımız kalite sertifikalıdır.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Yedek parça garantisi var mı?
              </h3>
              <p className="text-gray-700">
                Tüm ürünlerimizde 2 yıl garanti bulunmaktadır. Montaj hatası dışındaki 
                arızalarda ücretsiz değişim yapılır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              724ParcaBul - Türkiye'nin Yedek Parça Lideri
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              2010 yılından beri Türkiye'nin her yerine kaliteli yedek parça hizmeti sunuyoruz. 
              50.000'den fazla ürün çeşidi, 500.000+ memnun müşteri, 1 milyon+ başarılı teslimat. 
              Motor parçaları, fren sistemi, süspansiyon, elektrik parçaları ve daha fazlası için 
              güvenilir adresiniz 724ParcaBul.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-blue-600 px-3 py-1 rounded">Otomotiv Yedek Parça</span>
              <span className="bg-green-600 px-3 py-1 rounded">Motor Parçaları</span>
              <span className="bg-red-600 px-3 py-1 rounded">Fren Balata</span>
              <span className="bg-purple-600 px-3 py-1 rounded">Amortisör</span>
              <span className="bg-yellow-600 px-3 py-1 rounded">Lastik</span>
              <span className="bg-indigo-600 px-3 py-1 rounded">Filtre</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

