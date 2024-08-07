import axios from 'axios'

const productsApi = axios.create({
    baseURL: 'http://localhost:3600/todos'
})

export const getProducts = async () => {
    const res = await productsApi.get('/')
    return res.data
}

export const createProduct = async (product) => productsApi.post('/', product)

export const deleteProduct = id => productsApi.delete(`/${id}`)

export const updateProduct = (product) => productsApi.patch(`/${product.id}`, product)
