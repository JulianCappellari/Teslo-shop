export const revalidate = 604800; // se revalida en 7 dias lo general

import { getProductoConSlug } from "@/actions";
import {
  MuestraProducto,
  MuestraProductoMobile,
  SelectorCantidad,
  SelectorTalle,
  StockLabel,
} from "@/components";
import { fontTitulo } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AgregarAlCarrito } from "./ui/AgregarAlCarrito";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = params;
  const producto = await getProductoConSlug(slug);
  if (!producto) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid gtid-cols-1 md:grid-cols-3 gap-3 ">
      {/* Muestra */}

      {/* el estilo aca agarra un 2 de 3 columnas */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop */}
        <MuestraProducto
          titulo={producto.titulo}
          imagenes={producto.imagenes}
          className="hidden md:block"
        />

        {/* Mobile */}
        <MuestraProductoMobile
          titulo={producto.titulo}
          imagenes={producto.imagenes}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px5">
        <StockLabel slug={producto.slug} />

        <h1 className={`${fontTitulo.className} antialiased font-bold text-xl`}>
          {producto.titulo}
        </h1>
        <p className="text-lg mb-5 ">${producto.precio}</p>

        <AgregarAlCarrito producto={producto} />

        {/*  Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{producto.descripcion}</p>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug; // !Lo qwe se modifica

  // fetch data
  const product = await getProductoConSlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.titulo ?? "Producto no encontrado",
    description: product?.descripcion ?? "",
    openGraph: {
      title: product?.titulo ?? "Producto no encontrado",
      description: product?.descripcion ?? "",
      images: [`/productos/${product?.imagenes[1]}`],
    },
  };
}
