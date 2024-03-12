import Link from "next/link";
import { initialData } from "@/seed/seed";
import Image from "next/image";

import { PayPalBoton, StatusOrden, Titulo } from "@/components";

import { getOrdenById } from "@/actions";
import { redirect } from "next/navigation";
import { formatoMoneda } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}



export default async function OrdenesPage({ params }: Props) {
  const { id } = params;

  const { ok, orden } = await getOrdenById(id);

  if (!ok) {
    redirect("/");
  }

  const direccion = orden!.DireccionDeLaOrden;

  

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Titulo titulo={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-1">
            <StatusOrden estaPagada={orden!.estaPagada ?? false} />

            {/* Items */}
            {orden!.ItemsDeLaOrden.map((item) => (
              <div
                key={item.producto.slug + "-" + item.talle}
                className="flex mb-5 "
              >
                <Image
                  src={`/products/${item.producto.ImagenProducto[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.producto.titulo}
                  className="mr-5 rounded"
                />

                <div className="">
                  <p>{item.producto.titulo}</p>
                  <p>${item.precio} x {item.cantidad}</p>
                  <p className="font-bold">Subtotal: {formatoMoneda(item.precio * item.cantidad)} </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - resumen de la compra */}

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{direccion!.nombre} {direccion!.apellido}</p>
              <p>{direccion!.direccion}</p>
              {direccion!.direccion2 && direccion!.direccion2 !== "n/a" && (
                <p>{direccion!.direccion2}</p>
              )}
              <p>{direccion!.codigoPostal}</p>
              <p>{direccion!.ciudad}, {direccion!.paisId}</p>
              <p>{direccion!.telefono}</p>
            </div>

            {/* Divisor */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Nro Productos</span>
              <span className="text-right">{orden?.itemsEnLaOrden === 1 ? "1 articulo" : `${orden?.itemsEnLaOrden} articulos`}</span>

              <span>Subtotal</span>
              <span className="text-right">{formatoMoneda(orden!.subTotal)}</span>

              <span>Impuestos (21%)</span>
              <span className="text-right">{formatoMoneda(orden!.impuesto)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="text-right mt-5 text-2xl">{formatoMoneda(orden!.total)}</span>
            </div>

              
            <div className="mt-5 w-full mb-2">
              {
                orden?.estaPagada ? ( 
                  <StatusOrden estaPagada={orden!.estaPagada ?? false} />
                  
                ) : (
                  <PayPalBoton amount={orden!.total} ordenId={orden!.id}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

