'use client'

import { getStockConSlug } from '@/actions/producto/get-stock-con-slug'
import { fontTitulo } from '@/config/fonts'
import { useEffect, useState } from 'react'

interface Props {
  slug: string
}

export const StockLabel = ({slug}:Props) => {

  const [stock, setStock] = useState(0)
  const [estaCargando, setEstaCargando] = useState(true)

  useEffect(() => {
    const getStock = async() => {
      const enStock = await getStockConSlug(slug)
      setStock(enStock)
      setEstaCargando(false)
    }
    getStock()
  },[slug])

  // todo: se puede hacer una sola funcion donde con una colsta a la base de datos te pueda devolver los talles, precio, etc

  return (
    <div>
      {
        estaCargando ? (

          <h1 className={`${fontTitulo.className} antialiased font-bold text-lg animate-pulse bg-gray-200`}>&nbsp;</h1>
        ) : (

          <h1 className={`${fontTitulo.className} antialiased font-bold text-lg`}>En stock: {stock}</h1>
        )
      }
    </div>
  )
}

 
