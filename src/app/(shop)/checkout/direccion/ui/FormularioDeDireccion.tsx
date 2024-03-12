"use client";
import { eliminarUsuarioDireccion, setUsuarioDireccion } from "@/actions";
import { Direccion, Pais } from "@/interfaces";
import { useDireccionStore } from "@/store/direccion/direccion-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Es como una interfaz
type InputDelFormulario = {
  nombre: string;
  apellido: string;
  direccion: string;
  direccion2?: string ;
  codigoPostal: string;
  ciudad: string;
  pais: string;
  telefono: string;
  recordarDireccion: boolean;
};

interface Props {
  paises: Pais[];
  usuarioStoreDireccion?: Partial<Direccion> // El partial dice que todas las propiedades que tiene dirrecion van a ser opcionales
}

export default function FormularioDeDireccion({ paises, usuarioStoreDireccion = {} }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<InputDelFormulario>({
    defaultValues: {
      ...(usuarioStoreDireccion as any),
      recordarDireccion: false
    },
  });

  const router = useRouter()

  const { data: session } = useSession({
    // Si la persona no esta autenticada, lo manda al login
    required: true,
  });

  const setDireccion = useDireccionStore((state) => state.setDireccion);
  const direccion = useDireccionStore((state) => state.direccion);

  // Usamos el reset para establecer informacion al formulario
  useEffect(() => {
    if (direccion.nombre) {
      reset(direccion);
    }
  }, [direccion, reset]);

  const onSubmit = async (data: InputDelFormulario) => {
    
    const { recordarDireccion, ...restDireccion } = data;
    setDireccion(restDireccion);

    if (recordarDireccion) {
      // Llamar al server actions
      await setUsuarioDireccion(restDireccion, session!.user.id);
    } else {
      await eliminarUsuarioDireccion(session!.user.id);
    }

    router.push('/checkout')

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
    >
      <div className="flex flex-col mb-2">
        <span>Nombres</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("nombre", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Apellidos</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("apellido", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("direccion", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("direccion2")}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Código postal</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("codigoPostal", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Ciudad</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("ciudad", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>País</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register("pais", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {paises.map((pais) => (
            <option key={pais.id} value={pais.id}>
              {pais.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Teléfono</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register("telefono", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">
        <div className="inline-flex items-center mb-10">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register("recordarDireccion")}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

          <span>Recordar direccion?</span>
        </div>
        <button
          disabled={!isValid}
          type="submit"
          // href="/checkout"
          // className="btn-primary flex w-full sm:w-1/2 justify-center "
          className={clsx({
            "btn-primary": isValid,
            "btn-desabilitado": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
}
