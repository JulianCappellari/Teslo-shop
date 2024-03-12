import { auth } from "@/auth.config";
import { redirect } from "next/navigation";



export default async function CheckOutLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await auth();
    if (!session?.user) {

        redirect('/auth/login?returnTo=/checkout/direccion')
      }
    return (
      <>
        {children }
      </>
    );
  }