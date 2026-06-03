import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPeliculas, getGeneros } from "../services/api"
import { MdTheaterComedy, MdFamilyRestroom, MdOutlineLocalMovies, MdStar, MdMovieFilter, MdCategory } from "react-icons/md"
import { useCarrito } from "../context/CarritoContext"

const GENRE_ICONS = {
  comedia:  <MdTheaterComedy size={22} />,
  familiar: <MdFamilyRestroom size={22} />,
  terror:   <MdMovieFilter size={22} />,
  accion:   <MdStar size={22} />,
  drama:    <MdOutlineLocalMovies size={22} />,
}

function genreIcon(nombre = "") {
  return GENRE_ICONS[nombre.toLowerCase()] ?? <MdCategory size={22} />
}

export default function Home() {
  const [peliculas, setPeliculas] = useState([])
  const [generos, setGeneros] = useState([])
  const { dispatch } = useCarrito()

  useEffect(() => {
    getPeliculas().then(r => setPeliculas(Array.isArray(r.data) ? r.data : r.data.results ?? []))
    getGeneros().then(r => setGeneros(Array.isArray(r.data) ? r.data : r.data.results ?? []))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Generos</h2>
          <Link to="/catalogo" className="text-violet-400 text-sm hover:underline">Ver todo</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {generos.map(g => (
            <Link key={g.id} to={`/catalogo?genero=${g.id}`}
              className="flex items-center gap-3 card p-4 hover:border-violet-500 border border-transparent transition-colors">
              <span className="bg-violet-700/30 text-violet-300 p-2 rounded-lg">
                {genreIcon(g.nombre)}
              </span>
              <span className="text-white font-medium">{g.nombre}</span>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Peliculas Destacadas</h2>
          <Link to="/catalogo" className="text-violet-400 text-sm hover:underline">Ver todo</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {peliculas.slice(0, 10).map(p => (
            <div key={p.id} className="card overflow-hidden group">
              <div className="relative">
                {p.imagen
                  ? <img src={p.imagen} alt={p.titulo} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                  : <div className="w-full h-56 bg-gray-800 flex items-center justify-center text-gray-600"><MdOutlineLocalMovies size={40}/></div>
                }
                {p.genero && (
                  <span className="absolute top-2 right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                    {p.genero.nombre}
                  </span>
                )}
              </div>
              <div className="p-3 space-y-2">
                <h3 className="text-white font-semibold text-sm leading-tight">{p.titulo}</h3>
                <p className="text-gray-500 text-xs">{p.director} - {p.anio}</p>
                {p.precio && <p className="text-violet-400 font-bold text-sm">S/ {p.precio}</p>}
                <div className="flex gap-2 pt-1">
                  <Link to={`/pelicula/${p.id}`} className="btn-secondary flex-1 text-center text-xs py-1.5">
                    Ver detalle
                  </Link>
                  <button onClick={() => dispatch({ type: 'AGREGAR', item: p })} className="btn-primary flex-1 text-xs py-1.5">
                    + Carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}