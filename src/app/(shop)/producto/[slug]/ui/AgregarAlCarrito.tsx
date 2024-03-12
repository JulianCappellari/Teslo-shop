"use client";
import { SelectorCantidad, SelectorTalle } from "@/components";
import { Producto, ProductoDelCarrito, Talle } from "@/interfaces";
import { usarCarritoSore } from "@/store";

import { useState } from "react";

interface Props {
  producto: Producto;
}

// Se crea aca porque solo lo voy a utilizar en esta pantalla, en caso que lo utilice en mas de un lugar, lo crearia en components
export const AgregarAlCarrito = ({ producto }: Props) => {

  const agregarProductoAlCarrito = usarCarritoSore( state => state.agregarProductoAlCarrito)

  const [talle, setTalle] = useState<Talle | undefined>();
  const [cantidad, setCantidad] = useState<number>(1);
  const [seleccionado, setSeleccionado] = useState<boolean>(false);

  const agrrgarAlCarrito = () => {
    setSeleccionado(true);
    if (!talle) return;

    // agregar al carrito
    const productoCarrito: ProductoDelCarrito = {
      id: producto.id,
      slug: producto.slug,
      titulo: producto.titulo,
      precio: producto.precio,
      cantidad: cantidad,
      talle: talle,
      imagen: producto.imagenes[0]
    }
    agregarProductoAlCarrito(productoCarrito)
    // reestablesco los valores
    setSeleccionado(false)
    setCantidad(1)
    setTalle(undefined)
  };

  return (
    <div>
      {seleccionado && !talle && (
        <span className="mt-2 text-red-500">Debe de seleccionar una talla*</span>
      )}
      {/* Selector de talla */}
      <SelectorTalle
        talleSeleccionado={talle}
        talleDisponible={producto.talles}
        cargarTalleSeleccionado={setTalle}
      />

      {/* Selector de canrtidad  */}
      <SelectorCantidad cantidad={cantidad} cargarCantidad={setCantidad} />

      {/* Boton */}
      <button className="btn-primary my-5" onClick={agrrgarAlCarrito}>
        Agregar al carrito
      </button>
    </div>
  );
};
