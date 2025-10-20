
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

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

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode, addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Ürün bulunamadı');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.stock <= 0) {
      toast.error('Bu ürün stokta bulunmuyor');
      return;
    }

    if (quantity > product.stock) {
      toast.error('Stok miktarından fazla ürün seçemezsiniz');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        part_code: product.part_code,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock: product.stock,
      });
    }
    
    toast.success(`${quantity} adet ürün sepete eklendi`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Ürün Bulunamadı
          </h1>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Ana Sayfa
              </Link>
            </li>
            <li>
              <i className={`ri-arrow-right-s-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
            </li>
            <li>
              <Link to="/products" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Ürünler
              </Link>
            </li>
            <li>
              <i className={`ri-arrow-right-s-line ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}></i>
            </li>
            <li className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
              } mb-4`}>
                {product.part_code}
              </span>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                {product.name}
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                {product.description}
              </p>
            </div>

            <div className="border-t border-b py-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₺{product.price.toLocaleString('tr-TR')}
                </span>
                <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
                </div>
              </div>

              {product.stock > 0 && (
                <div className="flex items-center space-x-4 mb-6">
                  <label className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Miktar:
                  </label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className={`px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                      className={`w-16 text-center py-2 border-0 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} focus:ring-0`}
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className={`px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  product.stock > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <i className="ri-shopping-cart-line mr-2"></i>
                {product.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
              </button>
            </div>

            {/* Product Features */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Ürün Özellikleri
              </h3>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Orijinal kalitede üretim
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  2 yıl garanti
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Hızlı teslimat
                </li>
                <li className="flex items-center">
                  <i className="ri-check-line text-green-500 mr-2"></i>
                  Ücretsiz kargo (500₺ üzeri)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
