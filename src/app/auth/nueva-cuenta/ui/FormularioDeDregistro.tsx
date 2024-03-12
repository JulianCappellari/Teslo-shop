"use client";

import { login, registrar } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface InputFormulario {
  nombre: string;
  email: string;
  password: string;
}

export default function FormularioDeRegistro() {
  // const router = useRouter()
  const [mensajeError, setMensajeError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormulario>();

  const onSubmit: SubmitHandler<InputFormulario> = async (data) => {
    setMensajeError('');
    const { nombre, email, password } = data;

    // Server action
    const respuesta = await registrar(email, nombre,  password);
    if(!respuesta.ok){
        setMensajeError(respuesta.mensaje);
        return;
    }

    // console.log(respuesta);

    await login(email.toLowerCase(), password);
    // router.replace('/')
    window.location.replace('/');
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {/* { 
            errors.nombre?.type === 'requerid' && (
                <span className="text-red-500 ">El nombre es obligatorio</span>
            )
        } */}

      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.nombre,
        })}
        type="text"
        {...register("nombre", { required: true })}
      />
      <label htmlFor="email">Correo Electronico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i})}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />

      <span className="text-red-500 ">{mensajeError}</span>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
}
