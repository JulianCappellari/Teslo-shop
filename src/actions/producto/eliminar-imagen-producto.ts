"use server";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const eliminarImagenProducto = async (
  imagenId: number,
  imagenUrl: string
) => {
  if (!imagenUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se puede borrar imagenes del fileSistem",
    };
  }
  const nombreImagenCloudinary =
    imagenUrl.split("/").pop()?.split(".")[0] ?? ""; //Tomo la ultima parte del url

  try {
    await cloudinary.uploader.destroy(nombreImagenCloudinary);

    const imagenEliminada = await prisma.imagenProducto.delete({
      where: {
        id: imagenId,
      },
      select: {
        producto:{
            select:{
                slug: true
            }
        }
      }
    });

    // Revalidar los paths
    revalidatePath(`/admin/productos`)
    revalidatePath(`/admin/producto/${imagenEliminada.producto.slug}`)
    revalidatePath(`/producto/${imagenEliminada.producto.slug}`)
  } catch (error) {
    return {
      ok: false,
      mensaje: "no se pudo eliminar la imagen",
    };
  }
};
