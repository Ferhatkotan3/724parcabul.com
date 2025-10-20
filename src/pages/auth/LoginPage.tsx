

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '../../store/useStore';
import { mockUsers } from '../../mocks/users';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { isDarkMode, setUser } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple password check with predefined credentials
      const validCredentials: { [key: string]: { password: string; user: any } } = {
        'admin@724parcabul.com': {
          password: 'Admin123!',
          user: {
            id: 'admin_001',
            email: 'admin@724parcabul.com',
            role: 'admin',
            full_name: 'Admin Kullanıcı'
          }
        },
        'mehmet.yilmaz@email.com': {
          password: 'Mehmet123!',
          user: {
            id: 'user_001',
            email: 'mehmet.yilmaz@email.com',
            role: 'user',
            full_name: 'Mehmet Yılmaz'
          }
        },
        'ayse.kaya@email.com': {
          password: 'Ayse123!',
          user: {
            id: 'user_002',
            email: 'ayse.kaya@email.com',
            role: 'user',
            full_name: 'Ayşe Kaya'
          }
        },
        'ali.demir@email.com': {
          password: 'Ali123!',
          user: {
            id: 'user_003',
            email: 'ali.demir@email.com',
            role: 'user',
            full_name: 'Ali Demir'
          }
        }
      };

      const credential = validCredentials[data.email];
      
      if (!credential) {
        throw new Error('Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı');
      }

      if (credential.password !== data.password) {
        throw new Error('Şifre hatalı');
      }

      setUser(credential.user);

      toast.success('Başarıyla giriş yapıldı');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Giriş yapılırken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = (email: string, password: string) => {
    const form = document.querySelector('form') as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = form.querySelector('input[type="password"]') as HTMLInputElement;
    
    emailInput.value = email;
    passwordInput.value = password;
    
    // Trigger form submission
    onSubmit({ email, password });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col justify-center py-12 sm:px-6 lg:px-8`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <i className="ri-car-line text-white text-xl"></i>
          </div>
          <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Pacifico, serif' }}>
            724ParcaBul
          </span>
        </Link>
        <h2 className={`text-center text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Hesabınıza giriş yapın
        </h2>
        <p className={`mt-2 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Hesabınız yok mu?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Üye olun
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                E-posta adresi
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                Şifre
              </label>
              <div className="mt-1">
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Şifrenizi mi unuttunuz?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  Test hesapları
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => handleTestLogin('admin@724parcabul.com', 'Admin123!')}
                className={`w-full p-3 rounded-md text-left transition-colors cursor-pointer whitespace-nowrap ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
              >
                <p className="text-xs">
                  <strong>Admin Hesabı:</strong> admin@724parcabul.com / Admin123!
                </p>
              </button>
              
              <button
                onClick={() => handleTestLogin('mehmet.yilmaz@email.com', 'Mehmet123!')}
                className={`w-full p-3 rounded-md text-left transition-colors cursor-pointer whitespace-nowrap ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'}`}
              >
                <p className="text-xs">
                  <strong>Kullanıcı Hesabı:</strong> mehmet.yilmaz@email.com / Mehmet123!
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

