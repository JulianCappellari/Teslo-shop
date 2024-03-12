"use client";

import { usarCarritoSore } from "@/store";
import { formatoMoneda } from "@/utils";
import Image from "next/image";

import { useEffect, useState } from "react";

export const ProductosEnElCarrito = () => {
  const [cargado, setCargado] = useState(false);
  const productoEnElCarrito = usarCarritoSore((state) => state.carrito);

  useEffect(() => {
    setCargado(true);
  }, []);

  if (!cargado) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      {productoEnElCarrito.map((producto) => (
        <div
          key={`${producto.slug} - ${producto.talle}`}
          className="flex mb-5 "
        >
          <Image
            src={`/products/${producto.imagen}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={producto.titulo}
            className="mr-5 rounded"
          />
          <div className="">
            <span className="">
              {producto.talle} - {producto.titulo} ({producto.cantidad})
            </span>
            <p className="font-bold">
              {formatoMoneda(producto.precio * producto.cantidad)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
