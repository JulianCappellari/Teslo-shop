export const revalidate = 0;

import { getPaginacionUsuario } from "@/actions";
// https://tailwindcomponents.com/component/hoverable-table

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { TablaDeUsuarios } from "./ui/TablaDeUsuarios";
import { Paginacion, Titulo } from "@/components";


export default async function OrdersPage() {

  const { ok, usuarios = [] } = await getPaginacionUsuario();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Titulo titulo="Mantenimiento de usuarios" />

      <div className="mb-10">
        <TablaDeUsuarios usuarios={ usuarios } />

        <Paginacion totalPages={ 1 } />
      </div>
    </>
  );
}