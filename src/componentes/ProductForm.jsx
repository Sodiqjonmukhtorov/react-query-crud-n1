import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/productsAPI';

const ProductForm = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProductMutation.mutate({
      ...product,
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-5 flex gap-5 py-5 bg-orange-100 text-black flex-col w-1/4 rounded-lg">
      <div className="flex w-full self-start flex-col justify-center items-center">
        <label className="text-xl font-bold px-1 uppercase" htmlFor="name">Name</label>
        <input className="text-black py-0.5 w-1/2 rounded-lg shadow-sm" type="text" id="name" name="name" required />
      </div>

      <div className="flex w-full self-start flex-col justify-center items-center">
        <label className="text-xl font-bold px-1 uppercase" htmlFor="description">Description</label>
        <input className="text-black py-0.5 w-1/2 rounded-lg shadow-sm" type="text" id="description" name="description" required />
      </div>

      <div className="flex w-full self-start flex-col justify-center items-center">
        <label className="text-xl font-bold px-1 uppercase" htmlFor="price">Price</label>
        <input className="text-black py-0.5 w-1/2 rounded-lg shadow-sm" type="number" id="price" name="price" required />
      </div>

      <button className="bg-green-600 p-2 rounded-md cursor-pointer hover:bg-green-800 font-bold uppercase self-center text-white">Add Product</button>
    </form>
  );
};

export default ProductForm;
