
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../components/layout/Layout';

// Lazy load components
const HomePage = lazy(() => import('../pages/home/page'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const CartPage = lazy(() => import('../pages/cart/CartPage'));
const CategoriesPage = lazy(() => import('../pages/categories/CategoriesPage'));
const ProductDetailPage = lazy(() => import('../pages/product/ProductDetailPage'));
const OrdersPage = lazy(() => import('../pages/orders/OrdersPage'));
const AccountPage = lazy(() => import('../pages/account/AccountPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/order-success/OrderSuccessPage'));
const AdminPage = lazy(() => import('../pages/admin/AdminPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'category/:slug',
        element: <CategoriesPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'orders/:orderId',
        element: <OrdersPage />,
      },
      {
        path: 'order-success/:orderId',
        element: <OrderSuccessPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
