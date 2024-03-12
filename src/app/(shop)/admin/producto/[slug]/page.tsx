import { getCategorias, getProductoConSlug } from "@/actions";
import { Titulo } from "@/components";
import { redirect } from "next/navigation";
import { FormularioDeProducto } from "./ui/FormularioDeProducto";

interface Props {
    params: {
        slug: string
    }
}

export default async function ProductoPage({params}: Props) {
    const {slug} = params
    // console.log({slug})

    // Hacer las consultas en paralelos 
    const [producto, categorias] = await Promise.all([

        await getProductoConSlug(slug),
        await getCategorias()
    ])

    if(!producto && slug !== 'nuevo'){
        redirect('/admin/productos')
    }

    const titulo = slug === 'nuevo' ? 'Nuevo producto' : 'Editar producto'
  return (
    <>
      <Titulo titulo={ titulo }/>
      <FormularioDeProducto producto={producto ?? {}} categorias={categorias}/>
    </>
  );
}