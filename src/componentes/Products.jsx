import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, updateProduct } from "../api/productsAPI";

const Products = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data.sort((a, b) => b.id - a.id),
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return products.map((product) => (
    <div
      key={product.id}
      className="w-72 bg-orange-300 text-black flex flex-col justify-center items-start gap-2 rounded-lg p-2"
    >
      <h3><span className="font-bold uppercase">Name: </span>{product.name}</h3>
      <p><span className="font-bold uppercase">Description: </span>{product.description}</p>
      <p><span className="font-bold uppercase">Price: $</span>{product.price}</p>
      <button
        className="bg-red-500 w-1/2 flex justify-center self-center rounded-lg cursor-pointer hover:bg-red-800 font-bold uppercase text-white"
        onClick={() => {
          deleteProductMutation.mutate(product.id);
        }}
      >
        Delete
      </button>
      <button
        className="bg-blue-500 w-1/2 flex justify-center self-center rounded-lg cursor-pointer hover:bg-blue-800 font-bold uppercase text-white"
        onClick={() => {
          navigate(`/edit-product/${product.id}`);
        }}
      >
        Edit
      </button>
      <div className="w-full text-center flex justify-center gap-2">
        <input
          checked={product.inStock}
          type="checkbox"
          id={product.id}
          onChange={(e) => {
            updateProductMutation.mutate({
              ...product,
              inStock: e.target.checked,
            });
          }}
        />
        <label htmlFor={product.id}>In Stock</label>
      </div>
    </div>
  ));
};

export default Products;
