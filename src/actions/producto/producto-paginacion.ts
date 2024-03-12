"use server";
import { Genero } from "@prisma/client";
import prisma from "../../lib/prisma";

interface opcionPaginacion {
  page?: number;
  take?: number;
  genero?: Genero
}

export const getPaginacionProductosConImagene = async ({
  page = 1,
  take = 12,
  genero,
}: opcionPaginacion) => {
  if (isNaN(Number(page))) page = 1; // si la pagina no es un numero, entonces ponele 1
  if (page < 1) page = 1;

  try {
    // Obtener los productos
    const productos = await prisma.producto.findMany({
      take: take,
      skip: (page - 1) * take, // es - 1 porque la primera pagina es la 0, no quiero que se saltee ninguna
      include: {
        ImagenProducto: {
          take: 2, //traer dos imagenes
          select: {
            url: true,
          },
        },
      },
      where: {
        genero: genero
      }
    });

    // console.log(productos)

    //Obtener el total de paginas
    const contador = await prisma.producto.count({where: {genero: genero}})
    const totalPaginas = Math.ceil( contador / take)


    // Mapear los productos y agregar las URL de las imágenes
    const productosConImagenes = productos.map((producto) => ({
      ...producto,
      imagenes: producto.ImagenProducto.map((imagen) => imagen.url),
    }));

    return {
      productos: productosConImagenes,
      currentPage: page,
      totalPages: totalPaginas
    };
  } catch (error) {
    throw new Error( 'No se pudo cargar')
  }
};
