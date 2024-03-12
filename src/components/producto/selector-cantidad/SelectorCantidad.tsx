'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"


interface Props {
    cantidad: number

    cargarCantidad: (cantidad: number ) => void
}

export const SelectorCantidad = ({cantidad, cargarCantidad}:Props) => {



    const cargarValor = (valor: number )=> {
        if( cantidad + valor < 1 ) return 
        cargarCantidad( cantidad + valor)
    }
  return (
    <div className="flex ">
      <button onClick={() => cargarValor(-1)}> <IoRemoveCircleOutline size={30} /></button>
      <span className="w-20 mx-3 px-5 bg-gray-300 text-center rounded">{cantidad}</span>
      <button onClick={() => cargarValor(1)}> <IoAddCircleOutline size={30} /></button>
    </div>
  )
}

 

