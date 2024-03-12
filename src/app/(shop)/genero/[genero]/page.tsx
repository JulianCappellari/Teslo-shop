export const revalidate = 60 // RElavalidad en 60 segundos 
import { getPaginacionProductosConImagene } from "@/actions";
import { Paginacion, ProductoGrid, Titulo } from "@/components";
import { Genero } from "@prisma/client";

import { notFound, redirect } from "next/navigation";




interface Props {
  params: {
    genero: string 
  },
  searchParams: {
    page?: string
  }
}

export default async function CategoriasPage( {params, searchParams}:Props ){
  const {genero} = params

  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { productos, currentPage, totalPages } = await getPaginacionProductosConImagene({page, genero: genero as Genero})
 
  console.log({currentPage, totalPages})
 
  if(productos.length === 0){
    redirect(`/genero/${genero}`)
  }

  // Filtro los productos ya teniendo el que es pasado por url
  // const productos = seedProductos.filter( producto => producto.genero === genero)

  const label: Record<string, string> = {
    'hombre' : 'para Hombres',
    'mujeres' : 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para Todos'
  }

  // if(id === 'kids'){
  //   notFound()
  // }
  return (
    <>
      <Titulo titulo={`Articulos de ${(label )[genero]}`} subtitulo="Todos los productos" className="mb-2"/>
      <ProductoGrid productos={productos}/>
      <Paginacion totalPages={totalPages} />
    </>
  );
}