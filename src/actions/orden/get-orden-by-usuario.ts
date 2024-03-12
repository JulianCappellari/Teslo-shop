'use server'

import { auth } from "@/auth.config"

import prisma from '@/lib/prisma'

export const getOrdenByUsuario = async() => {

    const session = await auth()

    if(!session?.user){
        return {
            ok: false,
            mensaje: 'Debe estar autenticado'
        }
    }

    const ordenes = await prisma.orden.findMany({
        where: {
            usuarioId: session.user.id
        },
        include: {
            DireccionDeLaOrden: {
                select: {
                    nombre: true,
                    apellido: true
                }
            }
        }
    })

    return {
        ok: true,
        ordenes: ordenes
    } 
}