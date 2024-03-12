"use client";

import { crearActualizarProducto, eliminarImagenProducto } from "@/actions";
import { ImagenProducto } from "@/components";
import {
  Categoria,
  ImagenProducto as ProductoConimagen,
  Producto,
} from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { ImEnlarge } from "react-icons/im";

interface Props {
  producto: Partial<Producto> & { ImagenProducto?: ProductoConimagen[] };
  categorias: Categoria[];
}

const talles = ["XS", "S", "M", "L", "XL", "XXL"];

interface InputDelFormulario {
  titulo: string;
  slug: string;
  descripcion: string;
  precio: number;
  enStock: number;
  talles: string[];
  etiquetas: string; // Camisa, remera
  genero: "hombre" | "mujeres" | "kid" | "unisex";
  categoriaId: string;

  imagenes?: FileList;
}

export const FormularioDeProducto = ({ producto, categorias }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch, //Le dice cuando se tiene que volver a renderizar en caso de que haya alñgun cambio en el formulario
  } = useForm<InputDelFormulario>({
    defaultValues: {
      ...producto,
      etiquetas: producto.etiquetas?.join(", "),
      talles: producto.talles ?? [],

      imagenes: undefined,
    },
  });
  watch("talles");

  const onSubmit = async (data: InputDelFormulario) => {
    // console.log({ data });

    // Se crea un objeto FormData para manejar los datos del formulario y las imágenes
    const formData = new FormData();

    // Se extraen las imágenes del objeto data
    const { imagenes, ...productoAGuardar } = data;

    // Se verifica si el producto ya existe (tiene un id)
    if (producto.id) {
      // Si existe, se agrega su id al FormData
      formData.append("id", producto.id ?? "");
    }

    // Se agregan al FormData los datos del producto a guardar
    formData.append("titulo", productoAGuardar.titulo);
    formData.append("slug", productoAGuardar.slug);
    formData.append("descripcion", productoAGuardar.descripcion);
    formData.append("precio", productoAGuardar.precio.toString());
    formData.append("enStock", productoAGuardar.enStock.toString());
    formData.append("talles", productoAGuardar.talles.join(",")); // Se concatenan los talles separados por coma
    formData.append("etiquetas", productoAGuardar.etiquetas);
    formData.append("categoriaId", productoAGuardar.categoriaId);
    formData.append("genero", productoAGuardar.genero);

    // Si hay imágenes, se agregan al FormData una por una
    if (imagenes) {
      for (let i = 0; i < imagenes.length; i++) {
        formData.append("imagenes", imagenes[i]); // Se agrega cada imagen al FormData
      }
    }

    // Se envía el FormData al backend para crear o actualizar el producto
    const { ok, producto: productoActualizado } = await crearActualizarProducto(
      formData
    );

    // Se verifica si la operación fue exitosa
    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }
    // Se redirige a la página del producto actualizado en caso de éxito
    router.replace(`/admin/producto/${productoActualizado?.slug}`);
  };

  const onTalleChange = (talle: string) => {
    const talles = new Set(getValues("talles"));

    talles.has(talle) ? talles.delete(talle) : talles.add(talle);

    setValue("talles", Array.from(talles));
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("titulo", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("descripcion", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("precio", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Etiqueta</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("etiquetas", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Genero</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("genero", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="hombre">Hombre</option>
            <option value="mujeres">Mujer</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoriaId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("enStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {talles.map((talle) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={talle}
                onClick={() => onTalleChange(talle)}
                className={clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white":
                      getValues("talles").includes(talle),
                  }
                )}
              >
                <span>{talle}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              {...register("imagenes")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {producto.ImagenProducto?.map((imagen) => (
              <div key={imagen.id}>
                <ImagenProducto
                  alt={producto.titulo ?? ""}
                  src={imagen.url}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  onClick={() => eliminarImagenProducto(imagen.id, imagen.url)}
                  className="btn-eliminar rounded-b-xl w-full"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
