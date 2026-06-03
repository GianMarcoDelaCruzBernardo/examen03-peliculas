import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const getGeneros    = ()     => api.get('/generos/')
export const getPeliculas  = (p={}) => api.get('/peliculas/', { params: p })
export const getPelicula   = (id)   => api.get(`/peliculas/${id}/`)
export const crearPedido   = (data) => api.post('/pedidos/', data)
export const getMisPedidos = (email)=> api.get('/pedidos/', { params: { email_cliente: email } })
export const loginUser     = (data) => api.post('/login/', data)
export const registerUser  = (data) => api.post('/register/', data)
export const logoutUser    = ()     => api.post('/logout/')

export default api
