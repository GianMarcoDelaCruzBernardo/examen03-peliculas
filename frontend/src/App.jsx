import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import Navbar          from './components/Navbar'
import Footer          from './components/Footer'
import Home            from './pages/Home'
import Catalogo        from './pages/Catalogo'
import DetallePelicula from './pages/DetallePelicula'
import Carrito         from './pages/Carrito'
import MisPedidos      from './pages/MisPedidos'
import Login           from './pages/Login'
import Register        from './pages/Register'
import AdminRedirect   from './pages/AdminRedirect'
import NotFound        from './pages/NotFound'

export default function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/catalogo"        element={<Catalogo />} />
              <Route path="/pelicula/:id"    element={<DetallePelicula />} />
              <Route path="/carrito"         element={<Carrito />} />
              <Route path="/mis-pedidos"     element={<MisPedidos />} />
              <Route path="/login"           element={<Login />} />
              <Route path="/register"        element={<Register />} />
              <Route path="/admin-redirect"  element={<AdminRedirect />} />
              <Route path="*"               element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CarritoProvider>
  )
}
