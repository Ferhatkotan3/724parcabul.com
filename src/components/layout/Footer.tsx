
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export default function Footer() {
  const { isDarkMode } = useStore();

  return (
    <footer className="bg-gray-900 text-white">
      {/* SEO Rich Footer Content */}
      <div className="border-b border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info with SEO */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">724ParcaBul</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Türkiye'nin en büyük yedek parça platformu. 2010'dan beri kaliteli 
                otomotiv parçaları, hızlı teslimat ve güvenilir hizmet.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 İstanbul, Türkiye</p>
                <p>📞 0212 XXX XX XX</p>
                <p>✉️ info@724parcabul.com</p>
                <p>🕒 7/24 Online Hizmet</p>
              </div>
            </div>

            {/* Popular Categories - SEO */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Popüler Kategoriler</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Motor Parçaları</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Fren Balata & Disk</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Amortisör & Yay</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Elektrik Parçaları</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Lastik & Jant</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Motor Yağları</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Filtreler</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Egzoz Sistemi</Link></li>
              </ul>
            </div>

            {/* Popular Brands - SEO */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Popüler Markalar</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Volkswagen Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Ford Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Opel Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Renault Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">BMW Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Mercedes Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Audi Parça</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Tüm Markalar</Link></li>
              </ul>
            </div>

            {/* Customer Service - SEO */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Müşteri Hizmetleri</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors">Hesabım</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:text-white transition-colors">Siparişlerim</Link></li>
                <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Sepetim</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">İade & Değişim</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kargo Takibi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Garanti Koşulları</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sıkça Sorulanlar</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Keywords Section */}
      <div className="border-b border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <h4 className="text-lg font-semibold mb-4 text-center text-yellow-400">
            Popüler Yedek Parça Aramaları
          </h4>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              'motor parçası', 'fren balata', 'amortisör', 'alternatör', 'marş motoru',
              'hava filtresi', 'yağ filtresi', 'lastik', 'buji', 'motor yağı',
              'egzoz', 'klima kompresörü', 'rotil', 'stabilize', 'abs sensörü',
              'yakıt filtresi', 'polen filtresi', 'cam suyu', 'antifriz', 'kayış'
            ].map((keyword, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer with SEO */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>© 2024 724ParcaBul. Tüm hakları saklıdır.</p>
              <p className="mt-1">
                Türkiye'nin en güvenilir yedek parça platformu - 50.000+ ürün, 500.000+ memnun müşteri
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-instagram-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-twitter-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-youtube-line text-xl"></i>
                </a>
              </div>
              <div className="border-l border-gray-700 pl-4">
                <a 
                  href="https://readdy.ai/?origin=logo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Website Builder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
