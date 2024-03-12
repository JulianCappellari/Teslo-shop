'use server'

import { auth } from "@/auth.config"
import prisma from '@/lib/prisma'

export const getPaginacionUsuario = async () => {
    const session = await auth()

    if(session?.user.rol !== 'admin'){
        return {
            ok:false,
            mensaje: 'Debe ser un administrador'
        }
    }

    const usuarios = await prisma.usuario.findMany({
        orderBy: {
            nombre: 'asc'
        }
    })

    return {
        ok: true,
        usuarios: usuarios
    }
}