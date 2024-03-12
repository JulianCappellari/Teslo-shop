'use client'

import { cargarRolUsuario } from "@/actions"
import { Usuario } from "@/interfaces"

interface Props {
    usuarios: Usuario[]
}

export const TablaDeUsuarios = ({usuarios}: Props) => {
  return (
    <div>
      <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
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
                Rol
              </th>
              
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {usuario.email}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                   {usuario.nombre}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <select className="text-sm w-full p-2 text-gray-900" value={usuario.rol} onChange={ e => cargarRolUsuario(usuario.id, e.target.value)}>
                    <option value={'admin'}>Administrador</option>
                    <option value={'usuario'}>Usuario</option>

                  </select>
                </td>
                
              </tr>
            ))}

            
          </tbody>
        </table>
    </div>
  )
}

 
