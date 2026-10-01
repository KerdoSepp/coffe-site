import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppNav from './components/AppNav.jsx';
import CartProvider from './components/CartProvider.jsx';
import UserProvider from './components/UserProvider.jsx';
import Delivery from './pages/Delivery.jsx';
import DetailItem from './pages/DetailItem.jsx';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <div className="min-h-dvh bg-page text-primary">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detail/:productId" element={<DetailItem />} />
              <Route path="/order" element={<Order />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <AppNav />
          </div>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
