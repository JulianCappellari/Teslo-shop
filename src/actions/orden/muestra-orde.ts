"use server"; 
import { auth } from "@/auth.config"; // Importa la función de autenticación desde el archivo de configuración de autenticación
import type { Direccion, Talle } from "@/interfaces"; // Importa tipos de datos para Direccion y Talle
import prisma from "@/lib/prisma"; // Importa el cliente Prisma para interactuar con la base de datos

interface ProductoEnLaOrden { // Define una interfaz que describe la estructura de un producto en la orden
  productoId: string;
  cantidad: number;
  talle: Talle;
}

export const muestraOrden = async ( // Declara una función asincrónica llamada muestraOrden que recibe una lista de productos en la orden y una dirección
  productoIds: ProductoEnLaOrden[],
  direccion: Direccion
) => {
  const session = await auth(); // Autentica al usuario y obtiene su sesión
  const usuarioId = session?.user.id; // Obtiene el ID del usuario de la sesión

  if (!usuarioId) { // Verifica si no se obtuvo un ID de usuario
    console.log('No hay session')
    return {
      ok: false,
      mensaje: "No hay session de usuario", // Devuelve un mensaje de error si no hay sesión de usuario
    };
  }

  const productos = await prisma.producto.findMany({ // Obtiene información de productos de la base de datos
    where: {
      id: {
        in: productoIds.map((p) => p.productoId), // Filtra los productos por sus IDs en la lista de IDs de productos
      },
    },
  });

  const itemsEnLaOrden = productoIds.reduce( // Calcula la cantidad total de productos en la orden
    (contador, producto) => contador + producto.cantidad,
    0
  );

  const { subTotal, impuesto, total } = productoIds.reduce( // Calcula los montos totales (subtotal, impuesto y total) de la orden
    (totales, item) => {
      const cantidadProductos = item.cantidad; // Obtiene la cantidad de productos de un ítem
      const producto = productos.find( // Busca el producto correspondiente en la lista de productos
        (producto) => producto.id === item.productoId
      );

      if (!producto) throw new Error(`${item.productoId} no existe - 500`); // Lanza un error si no se encuentra el producto en la base de datos

      const subTotal = producto.precio * cantidadProductos; // Calcula el subtotal para el producto

      totales.subTotal += subTotal; // Suma el subtotal al total acumulado
      totales.impuesto += subTotal * 0.21; // Calcula y suma el impuesto al total acumulado
      totales.total += subTotal * 1.21; // Calcula y suma el total al total acumulado

      return totales;
    },
    { subTotal: 0, impuesto: 0, total: 0 } // Inicializa los totales en cero
  );

  try {
    const prismaTransaccion = await prisma.$transaction(async (transaccion) => { // Inicia una transacción Prisma

      // 1) Actualiza el stock de los productos y verifica su disponibilidad
      const paraActualizarProductos = productos.map((producto) => {
        const cantidadProducto = productoIds // Obtiene la cantidad de un producto en la orden
          .filter((p) => p.productoId === producto.id)
          .reduce((acumulado, item) => item.cantidad + acumulado, 0);

        if (cantidadProducto === 0) { // Verifica si la cantidad del producto es cero
          throw new Error(`${producto.id} no tiene cantidad definida`); // Lanza un error si la cantidad del producto es cero
        }
        return transaccion.producto.update({ // Actualiza el stock del producto en la base de datos
          where: { id: producto.id },
          data: {
            enStock: {
              decrement: cantidadProducto, // Decrementa el stock del producto
            },
          },
        });
      });

      const actualizarProductos = await Promise.all(paraActualizarProductos); // Ejecuta todas las actualizaciones de productos en paralelo

      actualizarProductos.forEach((producto) => { // Verifica si hay valores negativos en las existencias de productos
        if (producto.enStock < 0) { // Si el stock del producto es negativo
          throw new Error( // Lanza un error indicando que no hay suficiente inventario
            `${producto.titulo} no tiene inventario suficiente`
          );
        }
      });

      // 2) Crea la orden en la base de datos
      const orden = await transaccion.orden.create({ 
        data: {
          usuarioId: usuarioId,
          itemsEnLaOrden: itemsEnLaOrden,
          subTotal: subTotal,
          impuesto: impuesto,
          total: total,

          ItemsDeLaOrden: {
            createMany: { // Crea múltiples ítems de orden en la base de datos
              data: productoIds.map((p) => ({
                cantidad: p.cantidad,
                talle: p.talle,
                productoId: p.productoId,
                precio:
                  productos.find((producto) => producto.id === p.productoId)
                    ?.precio ?? 0, // Obtiene el precio del producto o usa cero si no se encuentra
              })),
            },
          },
        },
      });

      // console.log({direccion})
      const { pais,...restoDireccion } = direccion;
      // console.log({restoDireccion})
       // Extrae el país y otras propiedades de la dirección
      const direccionOrden = await transaccion.direccionDeLaOrden.create({ // Crea la dirección de la orden en la base de datos
        data: {
          ...restoDireccion,
          paisId: pais,
          ordenId: orden.id, // Asocia la dirección con la orden recién creada
        },
      });

      return { // Retorna la orden, los productos actualizados y la dirección de la orden
        orden: orden,
        productosActualizados: actualizarProductos,
        direccionOrden: direccionOrden,
      };
    });

    return { // Retorna un objeto indicando que la operación fue exitosa junto con la orden y la transacción Prisma
      ok: true,
      orden: prismaTransaccion.orden,
      prismaTransaccion: prismaTransaccion,
    };
  } catch (error: any) { // Maneja errores si la transacción falla
    return { // Retorna un objeto indicando que la operación falló junto con un mensaje de error
      ok: false,
      mensaje: error.message,
    };
  }
};
