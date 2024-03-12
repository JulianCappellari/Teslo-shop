export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import {
  getOrdenByUsuario,
  getPaginacionOrdenes,
  getPaginacionProductosConImagene,
} from "@/actions";
import { ImagenProducto, Paginacion, Titulo } from "@/components";
import { formatoMoneda } from "@/utils";
import Image from "next/image";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function TodasLasOrdenes({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { productos, currentPage, totalPages } =
    await getPaginacionProductosConImagene({ page });

  return (
    <>
      <Titulo titulo="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href={"/admin/producto/nuevo"} className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Talles
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/producto/${producto.slug}`}>
                    <ImagenProducto
                      src={producto.ImagenProducto[0]?.url}
                      width={80}
                      height={80}
                      alt={producto.titulo}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/producto/${producto.slug}`} className="hover:underline">
                      {producto.titulo}
                  </Link>
                </td>
                <td className=" text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {formatoMoneda(producto.precio)}
                </td>
                <td className=" text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {producto.genero}
                </td>
                <td className=" text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {producto.enStock}
                </td>
                <td className=" text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {producto.talles.join(', ')}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <Paginacion totalPages={10} />
      </div>
    </>
  );
}
