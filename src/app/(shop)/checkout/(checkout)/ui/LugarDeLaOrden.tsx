"use client";

import { muestraOrden } from "@/actions";
import { usarCarritoSore } from "@/store";
import { useDireccionStore } from "@/store/direccion/direccion-store";
import { formatoMoneda } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LugarDeLaOrden = () => {
  const router= useRouter()
  const [cargado, setCargado] = useState(false);

  const [cargarOrden, setCargarOrden] = useState(false);

  const [mensajeError, setMensajeError] = useState('');

  const direccion = useDireccionStore((state) => state.direccion);

  const { subTotal, total, impuestos, itemsEnElCarrito } = usarCarritoSore(
    (state) => state.getSumaInformacion()
  );

  const carrito = usarCarritoSore((state) => state.carrito);
  const limpiarCarrito = usarCarritoSore((state) => state.limpiarCarrito);

  useEffect(() => {
    setCargado(true);
  }, []);

  const porCargarOrden = async () => {
    setCargarOrden(true);

    const productosEnLaOrden = carrito.map((producto) => ({
      productoId: producto.id,
      cantidad: producto.cantidad,
      talle: producto.talle,
    }));

    console.log({direccion, productosEnLaOrden})

    // Server actions
    const respuesta = await muestraOrden(productosEnLaOrden, {
      // Solo pasamos los campos necesarios para crear la dirección de la orden
      nombre: direccion.nombre,
      apellido: direccion.apellido,
      direccion: direccion.direccion,
      direccion2: direccion.direccion2,
      ciudad: direccion.ciudad,
      codigoPostal: direccion.codigoPostal,
      pais: direccion.pais,
      telefono: direccion.telefono
    })
    if(!respuesta.ok){
      setCargarOrden(false)
      setMensajeError(respuesta.mensaje)
      console.log(respuesta.ok)
      console.log(respuesta.mensaje)
      return 
    }
    //* Todo salio bien hasta aca
    limpiarCarrito()
    router.replace('/orden/' + respuesta.orden!.id)

    // Cambiar el estado de carga de vuelta a false después de completar la operación
    setCargarOrden(false);

  };

  if (!cargado) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Direccion de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {direccion.nombre} {direccion.apellido}
        </p>
        <p>{direccion.direccion}</p>
        {direccion.direccion2 && direccion.direccion2 !== "n/a" && (
          <p>{direccion.direccion2}</p>
        )}
        <p>{direccion.codigoPostal}</p>
        <p>
          {direccion.ciudad}, {direccion.pais}
        </p>
        <p>{direccion.telefono}</p>
      </div>

      {/* Divisor */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>Nro Productos</span>
        <span className="text-right">
          {itemsEnElCarrito === 1
            ? "1 articulo"
            : `${itemsEnElCarrito} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{formatoMoneda(subTotal)}</span>

        <span>Impuestos (21%)</span>
        <span className="text-right">{formatoMoneda(impuestos)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="text-right mt-5 text-2xl">{formatoMoneda(total)}</span>
      </div>

      <div className="mt-5 w-full mb-2">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en Colocar orden, aceptas nuestros
            <a href="#" className="underline">
              {" "}
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{mensajeError}</p>

        <button
          // href={"/ordenes/123"}
          onClick={porCargarOrden}
          className={clsx({
            "btn-primary": !cargarOrden,
            "btn-desabilitado": cargarOrden,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
