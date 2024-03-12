'use server'

import { auth } from "@/auth.config"
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache"

export const cargarRolUsuario = async ( usuarioId: string, rol: string) => {
    const session = await auth()

    if(session?.user.rol !== 'admin'){
        return {
            ok: false,
            mensaje: 'Debe ser administrador'
        }
    }
    try {

        const nuevoRol = rol === 'admin' ? 'admin' : 'usuario'
        const usuario =await prisma.usuario.update({
            where: {
                id: usuarioId
            },
            data: {
                rol: nuevoRol
            }

        })

        revalidatePath('/admin/usuarios')

        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            mensaje: 'No se pudo cargar el rol del usuario'
        }
    }


}