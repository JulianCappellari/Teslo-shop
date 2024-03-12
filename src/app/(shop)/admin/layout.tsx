import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {

    // Autenticacion de rutas
    const session = await auth()

    if(session?.user.rol !== 'admin' ){
        redirect('/login')
    }
  return (
    <>
      {children}
    </>
  );
}