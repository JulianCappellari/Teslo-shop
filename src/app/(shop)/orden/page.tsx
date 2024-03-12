export const revalidate = 0;
// https://tailwindcomponents.com/component/hoverable-table
import { getOrdenByUsuario } from "@/actions";
import { Titulo } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdenesPagePrincipal() {
  const { ok, ordenes = [] } = await getOrdenByUsuario();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Titulo titulo="Ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr
                key={orden.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {orden.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {orden.DireccionDeLaOrden?.nombre}{" "}
                  {orden.DireccionDeLaOrden?.apellido}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {orden.estaPagada ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orden/${orden.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>
    </>
  );
}
