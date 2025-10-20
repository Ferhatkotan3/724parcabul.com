
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  part_code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isDarkMode, addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast.error('Bu ürün stokta bulunmuyor');
      return;
    }

    addToCart({
      id: product.id,
      part_code: product.part_code,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock: product.stock,
    });
    
    toast.success('Ürün sepete eklendi');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`group block rounded-lg border transition-all duration-200 hover:scale-105 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } shadow-sm hover:shadow-md overflow-hidden`}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-48 w-full object-cover object-top group-hover:scale-110 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded ${
            isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
          }`}>
            {product.part_code}
          </span>
        </div>
        
        <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 line-clamp-2`}>
          {product.name}
        </h3>
        
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ₺{product.price.toLocaleString('tr-TR')}
            </span>
            <div className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`p-2 rounded-lg transition-colors ${
              product.stock > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <i className="ri-shopping-cart-line text-sm"></i>
          </button>
        </div>
      </div>
    </Link>
  );
}
