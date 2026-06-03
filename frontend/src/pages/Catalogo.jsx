import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPeliculas, getGeneros } from '../services/api'
import PeliculaCard from '../components/PeliculaCard'
import Loader       from '../components/Loader'
import EmptyState   from '../components/EmptyState'

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [peliculas, setPeliculas] = useState([])
  const [generos,   setGeneros]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [busqueda,  setBusqueda]  = useState('')
  const generoFiltro = searchParams.get('genero') || ''

  useEffect(() => {
    getGeneros().then(r => setGeneros(r.data.results || r.data)).catch(console.error)
  }, [])

  useEffect(() => {
    setLoading(true)
    getPeliculas(generoFiltro ? { genero: generoFiltro } : {})
      .then(r => setPeliculas(r.data.results || r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [generoFiltro])

  const filtradas = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.director.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Catalogo de Peliculas</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text" placeholder="Buscar por titulo o director..."
          value={busqueda} onChange={e => setBusqueda(e.target.value)}
          className="input-field flex-1"
        />
        <select
          value={generoFiltro}
          onChange={e => e.target.value ? setSearchParams({ genero: e.target.value }) : setSearchParams({})}
          className="input-field w-auto"
        >
          <option value="">Todos los generos</option>
          {generos.map(g => <option key={g.id} value={g.id}>{g.nombre}</option>)}
        </select>
      </div>

      {loading ? <Loader /> : filtradas.length === 0 ? (
        <EmptyState mensaje="No se encontraron peliculas." />
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-6">{filtradas.length} pelicula(s)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtradas.map(p => <PeliculaCard key={p.id} pelicula={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
