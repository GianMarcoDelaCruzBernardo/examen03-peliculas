import { createContext, useContext, useReducer, useEffect } from 'react'

const Ctx = createContext()

const init = { items: JSON.parse(localStorage.getItem('carrito') || '[]') }

function reducer(state, action) {
  let items
  switch (action.type) {
    case 'AGREGAR': {
      const existe = state.items.find(i => i.id === action.item.id)
      items = existe
        ? state.items.map(i => i.id === action.item.id ? { ...i, cantidad: i.cantidad + 1 } : i)
        : [...state.items, { ...action.item, cantidad: 1 }]
      return { items }
    }
    case 'ELIMINAR':    return { items: state.items.filter(i => i.id !== action.id) }
    case 'INCREMENTAR': return { items: state.items.map(i => i.id === action.id ? { ...i, cantidad: i.cantidad + 1 } : i) }
    case 'REDUCIR':     return { items: state.items.map(i => i.id === action.id ? { ...i, cantidad: i.cantidad - 1 } : i).filter(i => i.cantidad > 0) }
    case 'VACIAR':      return { items: [] }
    default: return state
  }
}

export function CarritoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init)
  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(state.items)) }, [state.items])
  const total         = state.items.reduce((a, i) => a + parseFloat(i.precio || 10) * i.cantidad, 0)
  const cantidadTotal = state.items.reduce((a, i) => a + i.cantidad, 0)
  return <Ctx.Provider value={{ ...state, dispatch, total, cantidadTotal }}>{children}</Ctx.Provider>
}

export const useCarrito = () => useContext(Ctx)
