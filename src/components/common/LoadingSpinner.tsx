
import { useStore } from '../../store/useStore';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const { isDarkMode } = useStore();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full animate-spin ${
          isDarkMode ? 'border-gray-600' : 'border-gray-300'
        }`}
        style={{
          borderTopColor: '#3B82F6',
        }}
      ></div>
    </div>
  );
}
