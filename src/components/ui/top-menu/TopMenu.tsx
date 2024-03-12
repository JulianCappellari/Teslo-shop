"use client";
import { fontTitulo } from "@/config/fonts";
import { usarCarritoSore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export default function TopMenu() {

  const [cargado, setCargado] = useState(false)

  const abrirMenu = useUIStore((state) => state.openMenuLateral);
  const totalItemsEnElCarrito = usarCarritoSore((state) =>
    state.getTotalItems()
  );

  useEffect(() => {
    setCargado(true)
  },[])

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${fontTitulo.className} antialiased font-bold`}>
            Teslo
          </span>
          <span>| Teslo</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="hidden sm:block">
        <Link
          href="/genero/hombre"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombre
        </Link>
        <Link
          href="/genero/mujeres"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href="/genero/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niño
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/buscar" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={
          ((totalItemsEnElCarrito === 0 ) && cargado ) ? '/empty' : "/carrito"} className="mx-2">
          <div className="relative">
            {(totalItemsEnElCarrito > 0 && cargado ) && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsEnElCarrito}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          onClick={abrirMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
}
