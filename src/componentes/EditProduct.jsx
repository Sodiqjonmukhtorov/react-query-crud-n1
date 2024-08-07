import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, updateProduct } from "../api/productsAPI";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [product, setProduct] = useState(null);

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    onSuccess: (data) => {
      const productToEdit = data.find((p) => p.id === parseInt(id));
      setProduct(productToEdit);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      navigate("/");
    },
  });

  if (!product) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductMutation.mutate(product);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description:
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-medium text-gray-700">
          In Stock:
        </label>
        <input
          type="checkbox"
          name="inStock"
          checked={product.inStock}
          onChange={handleChange}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
