"use client";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const menuLateralAbierto = useUIStore((state) => state.menuLateralAbierto);
  const cerrarMenu = useUIStore((state) => state.closeMenuLateral);
  const abrirMenu = useUIStore((state) => state.openMenuLateral);

  const { data: session } = useSession();

  // console.log(session?.user)

  const esAutenticado = !!session?.user;
  const esAdmin = session?.user.rol === "admin";
  // console.log({esAdmin})
  return (
    <div className="">
      {/* Bacjgraound black */}
      {menuLateralAbierto && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}
      {menuLateralAbierto && (
        <div
          onClick={cerrarMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[300px] sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-auto",
          {
            "translate-x-full": !menuLateralAbierto,
          }
        )}
      >
        <IoCloseOutline
          size={35}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => cerrarMenu()}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {esAutenticado && (
          <>
            <Link
              href={"/perfil"}
              onClick={() => cerrarMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>
            <Link
              href={"/orden"}
              onClick={() => cerrarMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {!esAutenticado && (
          <Link
            href={"/auth/login"}
            onClick={() => logout()}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {esAutenticado && (
          <button
            onClick={() => logout()}
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        
        {esAdmin && (
          <>
            {/* Separador */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href={"/admin/productos"}
              onClick={() => cerrarMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href={"/admin/ordenes"}
              onClick={() => cerrarMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href={"/admin/usuarios"}
              onClick={() => cerrarMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
