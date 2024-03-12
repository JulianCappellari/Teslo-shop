'use client'

import { ImagenProducto, SelectorCantidad } from "@/components"
import { usarCarritoSore } from "@/store"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductosEnElCarrito = () => {
    const [cargado, setCargado] = useState(false)
    const productoEnElCarrito = usarCarritoSore(state => state.carrito)

    const actualizarCantidadDeProductos = usarCarritoSore(state => state.actualizarCantidadDeProductos)
    const eliminarProducto = usarCarritoSore(state => state.eliminarProducto)

    useEffect(() => {
        setCargado(true)
    },[])

    if(!cargado){
        return <p>Cargando...</p>
    }
  return (
    <>
    {productoEnElCarrito.map((producto) => (
        <div key={`${producto.slug} - ${producto.talle}`} className="flex mb-5 ">
          <ImagenProducto
            src={producto.imagen}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px'
            }}
            alt={producto.titulo}
            className="mr-5 rounded"
          />
          <div className="">
            <Link href={`/producto/${producto.slug}`} className="hover:underline cursor-pointer">{producto.titulo}</Link>
            <p>${producto.precio}</p>
            <SelectorCantidad cantidad={producto.cantidad}  cargarCantidad={cantidad => actualizarCantidadDeProductos(producto, cantidad)}/>
            <button className="underline mt-3" onClick={() => eliminarProducto(producto)}>Remover</button>
          </div>
        </div>
      ))}
    </>
  )
}

 
