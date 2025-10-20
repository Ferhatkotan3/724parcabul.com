
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/product/ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { mockProducts } from '../../mocks/products';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { isDarkMode } = useStore();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const performSearch = () => {
      setIsLoading(true);
      
      if (!query.trim()) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      // Arama algoritması - parça kodu, isim, kategori ve açıklamada arama
      const results = mockProducts.filter(product => {
        const searchTerm = query.toLowerCase().trim();
        const productName = product.name.toLowerCase();
        const productCode = product.part_code?.toLowerCase() || '';
        const productDescription = product.description.toLowerCase();

        return (
          productName.includes(searchTerm) ||
          productCode.includes(searchTerm) ||
          productDescription.includes(searchTerm) ||
          // Parça numarası için özel arama
          productCode.replace(/[-\s]/g, '').includes(searchTerm.replace(/[-\s]/g, ''))
        );
      });

      // Sıralama
      let sortedResults = [...results];
      switch (sortBy) {
        case 'price-low':
          sortedResults.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedResults.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          sortedResults.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
          break;
        case 'newest':
          sortedResults.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        default:
          // Relevance - exact matches first
          sortedResults.sort((a, b) => {
            const aExact = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
            const bExact = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
            return bExact - aExact;
          });
      }

      setSearchResults(sortedResults);
      setIsLoading(false);
    };

    performSearch();
  }, [query, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Arama Sonuçları
          </h1>
          {query && (
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              "<span className="font-medium">{query}</span>" için {searchResults.length} sonuç bulundu
            </p>
          )}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Filtreler:
            </span>
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 cursor-pointer whitespace-nowrap">
              Tüm Kategoriler
            </button>
            <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer whitespace-nowrap">
              Stokta Var
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sırala:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-1 text-sm border rounded-lg pr-8 cursor-pointer ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="relevance">İlgili</option>
              <option value="price-low">Fiyat (Düşük-Yüksek)</option>
              <option value="price-high">Fiyat (Yüksek-Düşük)</option>
              <option value="name">İsim (A-Z)</option>
              <option value="newest">En Yeni</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <i className="ri-search-line text-4xl mb-4 opacity-50"></i>
            <h3 className="text-lg font-medium mb-2">Sonuç bulunamadı</h3>
            <p className="text-sm mb-4">
              "<span className="font-medium">{query}</span>" için hiçbir ürün bulunamadı.
            </p>
            <div className="space-y-2 text-sm">
              <p>Öneriler:</p>
              <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                <li>Yazım hatası olup olmadığını kontrol edin</li>
                <li>Daha genel terimler kullanın</li>
                <li>Parça kodunu tam olarak yazın</li>
                <li>Farklı anahtar kelimeler deneyin</li>
              </ul>
            </div>
            <Link
              to="/categories"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer whitespace-nowrap"
            >
              Kategorilere Göz At
            </Link>
          </div>
        ) : (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <i className="ri-search-line text-4xl mb-4 opacity-50"></i>
            <h3 className="text-lg font-medium mb-2">Arama yapın</h3>
            <p className="text-sm">
              Parça kodu, ürün adı veya kategori ile arama yapabilirsiniz.
            </p>
          </div>
        )}

        {/* Popular Searches */}
        {!query && (
          <div className="mt-12">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Popüler Aramalar
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                'motor parçası',
                'fren balata',
                'amortisör',
                'alternatör',
                'hava filtresi',
                'motor yağı',
                'fren diski',
                'lastik'
              ].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className={`px-4 py-2 text-sm rounded-lg border cursor-pointer whitespace-nowrap ${
                    isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
