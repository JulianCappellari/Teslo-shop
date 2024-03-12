import {  Titulo } from "@/components";

import Image from "next/image";
import Link from "next/link";
import { ProductosEnElCarrito } from "./ui/ProductoEnElCarrito";
import { LugarDeLaOrden } from "./ui/LugarDeLaOrden";



export default function DireccionPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Titulo titulo="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-1">
            <span className="text-xl"> Ajustar elementos</span>
            <Link href={"/carrito"} className="mb-5 underline">
              Editar carrito aqui
            </Link>
          

          {/* Items */}
            <ProductosEnElCarrito />
          </div>

          {/* Checkout - resumen de la compra */}

            <LugarDeLaOrden />


        </div>
      </div>
    </div>
  );
}
