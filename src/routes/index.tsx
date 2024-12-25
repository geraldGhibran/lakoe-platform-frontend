import StoreSetting from '@/features/Setting/pages/storeSetting';
import AdminHomePage from '@/features/admin/home/home';
import { AdminLayout } from '@/features/admin/layout/admin-layout';
import { SellerInfo } from '@/features/admin/seller/seller-info';
import Withdraw from '@/features/admin/withdraw/withdraw';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';
import { AuthLayout } from '@/features/auth/layout';
import CartPage from '@/features/marketplace/home/pages/Cart';
// import CheckoutPage from '@/features/marketplace/home/';
import Cart from '@/features/marketplace/home/components/Cart';
import DetailProduct from '@/features/marketplace/home/components/DetailProduct';
import CheckoutPage from '@/features/marketplace/home/pages/Checkout';
import DetailProductPage from '@/features/marketplace/home/pages/DetailProductPage';
import OrderPage from '@/features/order/orderPage';
import DetailOrder from '@/features/order/orderPage/detail-order';
import ProductList from '@/features/product/components';
import AddProductPage from '@/features/product/components/addProduct';
import { Dashboard } from '@/features/seller/dashboard';
import { SellerLayout } from '@/features/seller/layout/seller-layout';
import PaymentMethod from '@/features/seller/payment-method';
import ShipmentSeller from '@/features/seller/shipment';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetailProductPage />,
    children: [
      {
        path: '/product/detail/:name',
        element: <DetailProduct />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: '/detail-product/:id',
    element: <DetailProductPage />,
  },
  {
    path: '/tester/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: 'withdraw',
        element: <Withdraw />,
      },
      {
        path: 'seller',
        element: <SellerInfo />,
      },
    ],
  },
  {
    element: <SellerLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'add-product',
        element: <AddProductPage />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
      {
        path: 'detail-order',
        element: <DetailOrder />,
      },
      {
        path: 'settings',
        element: <StoreSetting />,
      },
      {
        path: 'pengiriman',
        element: <ShipmentSeller />,
      },
      {
        path: 'metode-pembayaran',
        element: <PaymentMethod />,
      },
    ],
  },
  {
    path: '*',
    element: <div>CHeck lagi url nya WOI !!!!!</div>,
  },
]);
