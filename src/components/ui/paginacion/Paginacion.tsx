"use client"; // Indica que este módulo debe ser ejecutado en el cliente (navegador)

import { generarNumeroPaginacion } from "@/utils"; // Importa la función generarNumeroPaginacion desde un módulo de utilidades

import clsx from "clsx"; // Importa la librería clsx para manejar clases de manera condicional

import Link from "next/link"; // Importa el componente Link de Next.js para manejar enlaces en la aplicación

import { redirect, usePathname, useSearchParams } from "next/navigation"; // Importa funciones de navegación de Next.js

import React from "react"; // Importa React para la creación de componentes

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"; // Importa iconos de react-icons

interface Props {
  totalPages: number; // Define la interfaz de props para el componente Paginacion, indicando que debe recibir un número totalPages
}

export const Paginacion = ({ totalPages }: Props) => {
  // Declara el componente Paginacion y desestructura totalPages de las props

  const pathName = usePathname(); // Obtiene la ruta actual usando el hook usePathname de Next.js
  const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda de la URL usando el hook useSearchParams de Next.js

  const pageString = searchParams.get("page") ?? 1; // Obtiene el número de página actual de los parámetros de búsqueda, o asigna 1 si no está presente
  const currentPage = isNaN(+pageString) ? 1 : +pageString; // Convierte el número de página actual a un número, o asigna 1 si no es un número válido

  if (currentPage < 1 || isNaN(+pageString)) {
    // Verifica si el número de página actual es menor que 1 o no es un número válido
    redirect(pathName); // Redirige a la ruta actual si el número de página es inválido
  }

  const todasLasPaginas = generarNumeroPaginacion(currentPage, totalPages); // Calcula todas las páginas para mostrar en la paginación

  const crearPaginaUrl = (pageNumber: number | string) => {
    // Define una función para crear la URL de cada página en la paginación
    const params = new URLSearchParams(searchParams); // Crea un nuevo objeto URLSearchParams con los parámetros de búsqueda actuales

    if (pageNumber === "...") {
      // Verifica si la página es un separador "..."
      return `${pathName}?${params.toString()}`; // Devuelve la URL actual si es un separador
    }

    if (+pageNumber <= 0) {
      // Verifica si la página es menor o igual a 0
      return `${pathName}`; // Devuelve la ruta actual si la página es inválida
    }

    if (+pageNumber > totalPages) {
      // Verifica si la página es mayor que el número total de páginas
      return `${pathName}?${params.toString()}`; // Devuelve la URL actual si la página es mayor que el número total de páginas
    }

    params.set("page", pageNumber.toString()); // Establece el número de página en los parámetros de búsqueda

    return `${pathName}?${params.toString()}`; // Devuelve la URL con los parámetros de búsqueda actualizados
  };

  return (
    <div className="flex justify-center text-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={crearPaginaUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {todasLasPaginas.map((pagina, index) => (
            <li className="page-item" key={pagina + "-" + index}>
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700":
                      pagina === currentPage,
                  }
                )}
                href={crearPaginaUrl(pagina)}
              >
                {pagina}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={crearPaginaUrl(currentPage + 1)}
            >
                
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
