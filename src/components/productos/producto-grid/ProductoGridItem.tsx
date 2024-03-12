'use client'
import { Producto } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  producto: Producto;
}

export const ProductoGridItem = ({ producto }: Props) => {
    const [displayImage, setDisplayImage] = useState(producto.imagenes[0])
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/producto/${producto.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={producto.titulo}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(producto.imagenes[1])}
          onMouseLeave={() => setDisplayImage(producto.imagenes[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/producto/${producto.slug}`}>{producto.titulo}</Link>
        <span className="font-bold">${producto.precio}</span>
      </div>
    </div>
  );
};
