export const revalidate = 60 // RElavalidad en 60 segundos 
import { getPaginacionProductosConImagene } from "@/actions";
import { Paginacion, ProductoGrid, Titulo } from "@/components";
import { fontTitulo } from "@/config/fonts";

import Image from "next/image";
import { Producto } from '../../interfaces/productos.interface';
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { productos, currentPage, totalPages } = await getPaginacionProductosConImagene({page})
 
  console.log({currentPage, totalPages})
 
  if(productos.length === 0){
    redirect('/')
  }
  // console.log(productos)

  return (
    <>
      <Titulo titulo="Tienda" subtitulo="Todos los productos" className="mb-2"/>
      <ProductoGrid productos={productos}/>

      <Paginacion totalPages={totalPages}/>
    </>
  );
}
