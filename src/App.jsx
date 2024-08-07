import React from 'react';
import ProductForm from './componentes/ProductForm';
import Products from './componentes/Products';
import EditProduct from './componentes/EditProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='flex justify-center flex-col items-center'>
        <h1 className="text-2xl font-bold my-5">Product Management</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm />
                <div className='grid grid-cols-2 gap-5'>
                  <Products />
                </div>
              </>
            }
          />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
