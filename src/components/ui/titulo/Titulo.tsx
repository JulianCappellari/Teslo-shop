import { fontTitulo } from '@/config/fonts'
import React from 'react'

interface Props{
    titulo: string,
    subtitulo?: string,
    className?: string
}


export const Titulo = ({titulo, subtitulo, className}:Props) => {
  return (
    <div className={ `${className} mt-3`}>
    <h1 className={`${fontTitulo.className} antialiased text-4xl font-semibold my-7`}>{titulo}</h1>
    {
        subtitulo && (
            <h3 className='text-xl mb-5'>{subtitulo}</h3>
        )
    }
    </div>
  )
}


