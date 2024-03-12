'use server'

import { auth } from "@/auth.config"

import prisma from '@/lib/prisma'

export const getPaginacionOrdenes = async() => {

    const session = await auth()

    if(session?.user.rol !== 'admin'){
        return {
            ok: false,
            mensaje: 'Debe ser administrador'
        }
    }

    const ordenes = await prisma.orden.findMany({
        orderBy: {
            creadoEl: 'asc'
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