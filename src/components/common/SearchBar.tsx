
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const SearchBar = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e?: React.FormEvent | any) => {
    if (e && e.preventDefault) e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Yedek parça ara... (motor parçası, fren balata, amortisör)"
          className="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          aria-label="Yedek parça arama - motor parçası, fren balata, amortisör ve binlerce ürün"
        />
        <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-sm font-medium"
          title="Yedek parça ara"
        >
          <i className="ri-search-line mr-1"></i>
          Ara
        </button>
      </div>
      
      {/* SEO Search Suggestions */}
      {searchQuery.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          <div className="p-3">
            <div className="text-xs text-gray-500 mb-2">Popüler aramalar:</div>
            <div className="space-y-1">
              {[
                'motor parçası',
                'fren balata',
                'amortisör',
                'alternatör',
                'hava filtresi'
              ].filter(item => 
                item.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion);
                    handleSearch();
                  }}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer text-sm"
                >
                  <i className="ri-search-line text-gray-400"></i>
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
