'use server'

import { auth } from "@/auth.config"

import prisma from '@/lib/prisma'

export const getOrdenById = async ( id: string) => {
    const session = await auth()

    if(!session?.user){
        return {
            ok: false,
            mensaje: 'Debe de estar autenticado '
        }
    }

    try {
        const orden = await prisma.orden.findUnique({
            where:{ id: id},
            include: {
                DireccionDeLaOrden: true,
                ItemsDeLaOrden: {
                    select: {
                        precio: true,
                        cantidad: true,
                        talle: true,

                        producto: {
                            select:{
                                titulo: true,
                                slug: true,

                                ImagenProducto: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        })

        if(!orden) throw `${id} no existe`

        if(session.user.rol === 'usuario'){
            if(session.user.id !== orden.usuarioId){
                throw `${id} no es de ese usuario`
            }
        }

        return {
            ok: true,
            orden: orden
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            mensaje: 'Orden no existe'
        }
    }
}