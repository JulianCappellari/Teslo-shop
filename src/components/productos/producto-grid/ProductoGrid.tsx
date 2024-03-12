

import { Producto } from '@/interfaces'
import React from 'react'
import { ProductoGridItem } from './ProductoGridItem'

interface Props {
    productos: Producto[]
}

export const ProductoGrid = ({productos}:Props) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10'>
      {
        productos.map( producto => (
            <ProductoGridItem key={producto.slug} producto={producto}/>
        ))
      }
    </div>
  )
}

 
